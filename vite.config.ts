import { UserConfig, defineConfig } from "vite";

import path from "node:path";
import * as fs from "node:fs/promises";

// Vite Plugins
import svgLoader from "vite-svg-loader";
import vitePluginWebExt from "./scripts/vite-plugin/vite-plugin-web-ext";
import vue from "@vitejs/plugin-vue";
import { composeVisitors } from "lightningcss";
import { lightningcssPluginUnoCSS, vitePluginUnoCSS } from "./scripts/vite-plugin/unocss";
import solidPlugin from "vite-plugin-solid";
//

import { changeManifest } from "./scripts/change-manifest";

const r = (str: string): string => {
    return path.resolve(import.meta.dirname, str);
};

const rl = (str: string): URL => {
    return new URL(str, import.meta.url);
};

const root = r("src");
const publicDir = r("public");
const outDir = r("dist");

export default defineConfig(({ command, mode }) => {
    let json: UserConfig = {};
    json = {
        root,
        publicDir,
        // base: "/",
        build: {
            outDir,
            emptyOutDir: false,
            sourcemap: true,
            // outDir,
            target: "es2023",
            assetsInlineLimit: 0,
            reportCompressedSize: false,

            rollupOptions: {
                input: {
                    "ent-options_html": r("src/options/options.html"),
                    "ent-popup_html": r("src/popup/popup.html"),
                    index: r("src/content/index.ts"),
                    background: r("src/background.ts"),
                    //safemode: r("src/shared/options/injectSafeMode.ts"),
                },
                output: {
                    dynamicImportInCjs: true,
                    format: "es",
                    entryFileNames: "[name].js",
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            const arr_module_name = id.toString().split("node_modules/")[1].split("/");
                            if (arr_module_name[0] === ".pnpm") {
                                return arr_module_name[1].toString();
                            }
                            return arr_module_name[0].toString();
                        };
                        if (id.includes("i18n")) {
                            return "i18n";
                        }
                    },
                    assetFileNames(assetInfo) {
                        if (assetInfo.originalFileNames.some((v) => v.endsWith(".css"))) {
                            return "assets/css/[name][extname]";
                        }
                        if (assetInfo.originalFileNames.some((v) => v.endsWith(".svg"))) {
                            return "assets/svg/[name][extname]";
                        }
                        return "assets/[name][extname]";
                    },
                    chunkFileNames(chunkInfo) {
                        if (chunkInfo.name.includes("i18n")) {
                            return "assets/i18n/[name].js";
                        }
                        return "assets/js/[name].js";
                    },
                },
                plugins: [],
            },
            minify: false,
        },
        css: {
            transformer: "lightningcss",
            lightningcss: {
                // https://lightningcss.dev/transpilation.html#feature-flags
                nonStandard: {
                    deepSelectorCombinator: true,
                },
                customAtRules: {
                    unocss: lightningcssPluginUnoCSS.customAtRules.unocss,
                },
                visitor: composeVisitors([
                    lightningcssPluginUnoCSS.visitor,
                ]),
            },
        },
        plugins: [
            {
                name: "copyResources",
                enforce: "post",
                options(options) {
                    // this.addWatch;
                    // console.log("watch");
                    // console.log(options.watch);
                    // if (options.watch) {
                    //     options.watch.include = r("_locales/**");
                    // }
                    // console.log(options.watch);
                },
                async buildStart(options) {
                    await Promise.all([
                        changeManifest(mode),
                        //fs.copyFile(rl("src/inject.js"), rl("dist/inject.js")),
                        //fs.copyFile(rl("src/safemode.html"), rl("dist/safemode.html")),
                        //fs.cp(rl("src/content/styles"), rl("dist/styles"), { recursive: true }),
                        fs.cp(rl("_locales"), rl("dist/_locales"), { recursive: true }),
                        //fs.cp(rl("icon"), rl("dist/icon"), { recursive: true }),
                    ]);
                    console.log("\x1b[32m✓\x1b[0m Copied injection scripts.");
                },
            },
            {
                name: "buildDate",
                enforce: "post",
                closeBundle() {
                    console.log(new Date().toLocaleString());
                },
            },
            vitePluginWebExt(import.meta.dirname, r("dist"), r("dist"), mode === "chromiumCRX" ? "disable-web-ext" : mode),
            vitePluginUnoCSS(),
            solidPlugin(),
            // Vue Plugins
            vue(),
            svgLoader({
                svgoConfig: {
                    plugins: ["prefixIds"],
                },
            }),
        ],
        resolve: {
            alias: [
                { find: "@content", replacement: r("src/content") },
                { find: "@shared", replacement: r("src/shared") },
                { find: "@modules", replacement: r("src/content/modules") },
                { find: "@i18nData", replacement: r("i18n") },
                { find: "@third-party", replacement: r("third-party") },
            ],
        },
    };
    return json;
});
