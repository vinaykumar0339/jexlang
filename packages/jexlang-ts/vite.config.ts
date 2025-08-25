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
        rollupOptions: {},
        sourcemap: true,
        // Ensure declaration files are included
        emptyOutDir: false,
    },
})