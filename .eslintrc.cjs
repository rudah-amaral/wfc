module.exports = {
  // Stops ESLint from searching more config files to merge in ancestor
  // directories.
  root: true,
  // Target environment.
  env: {
    browser: true,
    es2021: true,
  },
  // Provides sets of rules which I might individually apply and may also
  // provides zero or more configuration files.
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  // Apply configuration files sequentially. They may be sourced from a npm
  // package or exported from a plugin. Each groups several rules together that
  // are logically bounded.
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    // Should always be last to disable any formatting rules set by previous
    // configuration files.
    "prettier",
  ],
  // Shared settings for all configuration files.
  settings: {
    // Required by eslint-plugin-react.
    react: {
      version: "detect",
    },
  },
  // Allows ESLint to parse TypeScript code.
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // Override configuration for this specific file.
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.cjs"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
};
