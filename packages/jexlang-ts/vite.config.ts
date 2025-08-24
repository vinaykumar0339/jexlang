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
            name: "jexlang-ts",
            formats: ["es", "umd"],
            fileName: (format) => `jexlang-ts.${format}.js`
        },
        rollupOptions: {
            external: ["antlr4"],
            output: {
                globals: {
                    antlr4: "antlr4"
                }
            }
        },
        sourcemap: true,
        // Ensure declaration files are included
        emptyOutDir: false,
    },
    resolve: {
        alias: {
            // Add an alias for the antlr4 module
            antlr4: resolve(__dirname, "node_modules/antlr4")
        }
    },
})