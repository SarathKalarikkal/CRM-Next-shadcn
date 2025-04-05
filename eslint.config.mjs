import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,  
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-empty-object-type": "off",
    },
    ignorePatterns: ["node_modules", "dist", "build", "public", "src/types"],
    parserOptions: {
        project: "./tsconfig.json",
    },
    extends: ["next/core-web-vitals", "next/typescript"],
    plugins: ["@typescript-eslint"],
   
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
