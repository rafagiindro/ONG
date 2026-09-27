import { resolve } from "node:path";
import { defineConfig } from "vite";
import { minify } from "html-minifier-terser";

function minificarHtml() {
    return {
        name: "minificar-html",
        async transformIndexHtml(html) {
            return minify(html, {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true
            });
        }
    };
}

export default defineConfig({
    plugins: [minificarHtml()],
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "html/index.html"),
                projetos: resolve(__dirname, "html/projetos.html"),
                cadastro: resolve(__dirname, "html/cadastro.html")
            }
        }
    }
});