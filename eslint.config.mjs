import tailwind from "eslint-plugin-tailwindcss";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    files: ["**/*.vue"],
    plugins: {
      tailwind: tailwind,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "no-undef": "off",
      "require-await": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "vue/no-multiple-template-root": "warn",
      "vue/no-v-html": "off",
      "tailwind/classnames-order": "warn",
      "tailwind/no-unnecessary-arbitrary-value": "warn",
      "tailwind/no-contradicting-classname": "warn",
      "tailwind/enforces-shorthand": "warn",
    },
  },
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx",
      "**/*.mjs",
      "**/*.cjs",
    ],
    rules: {
      "no-undef": "off",
      "require-await": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  }
);
