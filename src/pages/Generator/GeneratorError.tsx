import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import styles from "./GeneratorError.module.scss";

export default function GeneratorError() {
  const error = useRouteError();

  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div className={styles.error}>
      <h1 className={styles.errorTitle}>An error has occured.</h1>
      <h2 className={styles.errorSubTitle}>
        Error message: <i>{errorMessage}</i>.
      </h2>
      <p>
        <Link to="." className={styles.errorText}>
          return to the Generator
        </Link>
      </p>
    </div>
  );
}
