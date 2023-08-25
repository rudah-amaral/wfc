export default {
  "**/*.ts?(x)": (filenames) => {
    const styleFix = `prettier --write ${filenames.join(" ")}`;
    const typeCheck = "tsc -p tsconfig.json --noEmit";
    const lintCheck = `eslint --max-warnings=0 ${filenames.join(" ")}`;
    const styleCheck = `prettier --check ${filenames.join(" ")}`;
    return [
      styleFix,
      `concurrently -c "auto" "${typeCheck}" "${lintCheck}" "${styleCheck}"`,
    ];
  },
  "**/*.?(s)css": (filenames) => `prettier --write ${filenames.join(" ")}`,
};
