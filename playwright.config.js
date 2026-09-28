import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: false,
    workers: 1,
    reporter: [["list"], ["json", { outputFile: "reports/browser-tests.json" }]],
    use: {
        browserName: "chromium",
        channel: process.platform === "win32" ? "msedge" : undefined,
        baseURL: "http://127.0.0.1:4176",
        viewport: { width: 1366, height: 900 },
        screenshot: "only-on-failure"
    },
    webServer: [
        { command: "npm run preview -- --host 127.0.0.1 --port 4176 --strictPort", url: "http://127.0.0.1:4176/html/index.html", reuseExistingServer: false },
        { command: "npm run preview -- --host 127.0.0.1 --port 4177 --strictPort --base=/instituto/", url: "http://127.0.0.1:4177/instituto/html/index.html", reuseExistingServer: false },
        { command: "npm run preview -- --host 127.0.0.1 --port 4178 --strictPort --outDir .build-unminified", url: "http://127.0.0.1:4178/html/index.html", reuseExistingServer: false }
    ]
});
