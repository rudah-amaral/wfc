import styles from "./About.module.scss";

export default function AboutTheTech() {
  return (
    <>
      <p>
        This website is a{" "}
        <a href="https://react.dev/" className={styles.link}>
          React
        </a>{" "}
        +{" "}
        <a href="https://www.typescriptlang.org/" className={styles.link}>
          TypeScript
        </a>{" "}
        project scaffolded with{" "}
        <a href="https://vitejs.dev/" className={styles.link}>
          Vite
        </a>
        .
      </p>

      <p>
        Styling was done with{" "}
        <a href="https://sass-lang.com/" className={styles.link}>
          SCSS
        </a>
        , using{" "}
        <a
          href="https://github.com/css-modules/css-modules"
          className={styles.link}
        >
          CSS Modules
        </a>{" "}
        in order to scope styles locally (but in retrospect CSS-in-JS solutions
        seems more appropriate now, there are too many state dependent styles).
      </p>

      <p>
        Client side routing was done with{" "}
        <a href="https://reactrouter.com/en/main" className={styles.link}>
          React Router
        </a>
        . It&apos;s just a hash router using their Data API.
      </p>

      <p>
        Hosted on{" "}
        <a href="https://pages.github.com/" className={styles.link}>
          GitHub Pages
        </a>{" "}
        using{" "}
        <a href="https://github.com/features/actions" className={styles.link}>
          GitHub Actions
        </a>{" "}
        to deploy on{" "}
        <a href="https://git-scm.com/docs/git-push" className={styles.link}>
          git push
        </a>{" "}
        (whew, that was a lot &quot;gits&quot;, I wish I was being paid by the
        links).
      </p>

      <p>
        <a href="https://prettier.io/" className={styles.link}>
          Prettier
        </a>
        ,{" "}
        <a href="https://eslint.org/" className={styles.link}>
          ESLint
        </a>
        ,{" "}
        <a href="https://typicode.github.io/husky/" className={styles.link}>
          Husky
        </a>{" "}
        and{" "}
        <a
          href="https://www.npmjs.com/package/lint-staged"
          className={styles.link}
        >
          lint-staged
        </a>{" "}
        keep me from commiting non-typechecked, non-lintted, non-formatted code.
        I try to run those tasks in parallel as much as possible with{" "}
        <a
          href="https://www.npmjs.com/package/concurrently"
          className={styles.link}
        >
          concurrently
        </a>
        .
      </p>

      <p>And that&apos;s about it!</p>
    </>
  );
}
