import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { createHash } from "node:crypto";

async function inventory(directory, prefix = "") {
    const result = [];
    for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
        const path = join(prefix, entry.name);
        if (entry.isDirectory()) result.push(...await inventory(directory, path));
        else {
            const data = await readFile(join(directory, path));
            result.push({ path: path.replaceAll("\\", "/"), bytes: data.length,
                sha256: createHash("sha256").update(data).digest("hex") });
        }
    }
    return result.sort((a, b) => a.path.localeCompare(b.path));
}
const category = path => ({ ".html": "HTML", ".css": "CSS", ".js": "JavaScript",
    ".png": "Imagens", ".jpg": "Imagens", ".webp": "Imagens", ".svg": "Imagens" })[extname(path)] || "Outros";
const source = [];
for (const folder of ["html", "css", "js", "img"]) {
    source.push(...(await inventory(folder)).map(file => ({ ...file, path: folder + "/" + file.path })));
}
for (const path of ["index.html", "projetos.html", "cadastro.html"]) {
    const data = await readFile(path);
    source.push({ path, bytes: data.length, sha256: createHash("sha256").update(data).digest("hex") });
}
const before = await inventory(".build-unminified");
const after = await inventory("dist");
const sum = (files, type) => files.filter(f => type === "Total" || category(f.path) === type ||
    (type === "Código" && ["HTML", "CSS", "JavaScript"].includes(category(f.path)))).reduce((n, f) => n + f.bytes, 0);
const rows = ["HTML", "CSS", "JavaScript", "Código", "Imagens", "Total"].map(type => {
    const original = sum(source, type), unminified = sum(before, type), minified = sum(after, type);
    return { category: type, source: original, unminified, minified,
        reductionBytes: unminified - minified,
        reductionPercent: (unminified - minified) / unminified * 100,
        sourceToBuildPercent: (original - minified) / original * 100 };
});
const imageHashes = files => files.filter(f => category(f.path) === "Imagens").map(f => f.sha256).sort().join(",");
if (imageHashes(source) !== imageHashes(after)) throw new Error("Imagens da build diferem das fontes; revisar a metodologia.");
const report = { measuredAt: new Date().toISOString(), node: process.version,
    method: "Duas builds do mesmo código/configuração, com minificação HTML/CSS/JS desativada ou ativada. Bytes em disco, sem gzip/Brotli. Imagens externas, sem inline ou recompressão.",
    rows, source, unminified: before, minified: after };
await mkdir("reports", { recursive: true });
await writeFile("reports/sizes.json", JSON.stringify(report, null, 2) + "\n");
const table = rows.map(r => "| " + r.category + " | " + r.source + " | " + r.unminified + " | " + r.minified + " | " + r.reductionPercent.toFixed(2) + "% |").join("\n");
await writeFile("reports/sizes.md", "# Medição real de bytes\n\n" + report.method + "\n\nData: " + report.measuredAt +
    "\n\n| Categoria | Fonte (B) | Build sem minificar (B) | Build minificada (B) | Redução por minificação |\n|---|---:|---:|---:|---:|\n" +
    table + "\n\nFórmula: (sem minificar − minificado) / sem minificar × 100. A comparação fonte/build inclui efeitos de bundling; não mede apenas minificação. Inventário e hashes completos em sizes.json. Imagens idênticas às fontes, confirmadas por SHA-256.\n");
console.table(rows);
