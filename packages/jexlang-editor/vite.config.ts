import { resolve } from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: resolve(__dirname, "tsconfig.json")
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "jexlang-editor",
            formats: ["es", "umd"],
            fileName: (format) => `jexlang-editor.${format}.js`
        },
        rollupOptions: {
            external: ["monaco-editor"],
            output: {
                globals: {
                    "monaco-editor": "monaco-editor"
                }
            }
        },
    },
})