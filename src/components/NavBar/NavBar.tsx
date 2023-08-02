import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function NavBar() {
  return (
    <>
      <header>
        <nav>
          <ul className={styles.linksList}>
            <li className={styles.listItem}>
              <NavLink to="/" className={styles.link}>
                Home
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink to="generate" className={styles.link}>
                Generate
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
      <main>
        <Outlet />
      </main>
    </>
  );
}
