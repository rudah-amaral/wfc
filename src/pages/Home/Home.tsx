import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Visualize procedurally generated images</h1>
      <h2 className={styles.subtitle}>
        Unveil the potential of Wave Function Collapse&apos; simple tiled model!
      </h2>
      <div className={styles.buttons}>
        <Link to="generator" className={styles.buttonLink}>
          Try it out
        </Link>
        <Link to="about" className={styles.buttonLink}>
          Learn about the project
        </Link>
      </div>
    </div>
  );
}
