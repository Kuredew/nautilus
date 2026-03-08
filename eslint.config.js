import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
     
      globals: {
        ...globals.browser,
        ...globals.node, 
        
        app: "readonly",
        Folder: "readonly",
        File: "readonly",
        Socket: "readonly",
        UnitValue: "readonly",
        CompItem: "readonly",
        Layer: "readonly",
        AVLayer: "readonly",
        TextLayer: "readonly",
        ShapeLayer: "readonly",
        Property: "readonly",
        PropertyGroup: "readonly",
        Effect: "readonly",
        Panel: "readonly",
        Window: "readonly",
        alert: "readonly",
        confirm: "readonly",
        prompt: "readonly",
        write: "readonly",
        writeLn: "readonly",
        isValid: "readonly",
        system: "readonly",
        dollars: "readonly",
      },
    },
    rules: {
      "no-undef": "error",     
      "no-unused-vars": "warn", 
      "no-console": "off",       
      "no-inner-declarations": "off",
      "preserve-caught-error": "off",

      "import/no-unresolved": "error", // Error jika file tidak ada
      "import/named": "error",         // Error jika fungsi/export tidak ada di file tujuan
    },
  },
];