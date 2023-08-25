export default {
  "**/*.ts?(x)": (filenames) => {
    const styleFix = `prettier --write ${filenames.join(" ")}`;
    const typeCheck = "tsc -p tsconfig.json --noEmit";
    const lintCheck = `eslint --max-warnings=0 ${filenames.join(" ")}`;
    const styleCheck = `prettier --check ${filenames.join(" ")}`;
    const cmd = 'concurrently -c "auto" -n "type-check,lint-check,style-check"';
    return [styleFix, `${cmd} "${typeCheck}" "${lintCheck}" "${styleCheck}"`];
  },
  "**/*.?(s)css": (filenames) => `prettier --write ${filenames.join(" ")}`,
};
