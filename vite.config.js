import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { minify } from "html-minifier-terser";

function minificarHtml() {
    return {
        name: "minificar-html",
        apply: "build",
        transformIndexHtml: {
            order: "post",
            async handler(html) {
                return minify(html, {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                });
            }
        }
    };
}

export default defineConfig(({ mode }) => ({
    base: "./",
    appType: "mpa",
    plugins: mode === "measurement" ? [] : [minificarHtml()],
    build: {
        outDir: mode === "measurement" ? ".build-unminified" : "dist",
        minify: mode === "measurement" ? false : "esbuild",
        cssMinify: mode !== "measurement",
        assetsInlineLimit: 0,
        rollupOptions: {
            input: {
                raiz: fileURLToPath(new URL("./index.html", import.meta.url)),
                projetosRaiz: fileURLToPath(new URL("./projetos.html", import.meta.url)),
                cadastroRaiz: fileURLToPath(new URL("./cadastro.html", import.meta.url)),
                index: fileURLToPath(new URL("./html/index.html", import.meta.url)),
                projetos: fileURLToPath(new URL("./html/projetos.html", import.meta.url)),
                cadastro: fileURLToPath(new URL("./html/cadastro.html", import.meta.url))
            }
        }
    }
}));
