import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.linksList}>
          <li className={styles.listItem}>
            <NavLink to="/" className={styles.link}>
              Home
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink to="generator" className={styles.link}>
              Generator
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink to="about" className={styles.link}>
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
