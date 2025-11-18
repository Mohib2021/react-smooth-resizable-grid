import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import postcss from "rollup-plugin-postcss";

// rollup.config.mjs
export default defineConfig({
  input: "src/index.ts",
  output: {
    name: "react-smooth-resizable-grid",
    format: "es",
    dir: "dist",
  },
  external: ["react", "react-dom"],
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }),
    postcss({
      extract: false, // ✅ generates a separate .css file
      minimize: true,
      inject: true,
    }),
  ],
});
