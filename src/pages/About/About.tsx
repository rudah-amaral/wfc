import { useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./About.module.scss";

export default function About() {
  const $container = useRef<HTMLDivElement>(null);
  const $linksList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let headerSize = 0;

    const $header = document.querySelector("header");
    if ($header) {
      headerSize += parseFloat(
        getComputedStyle($header).getPropertyValue("height")
      );
    }

    if ($container.current) {
      const mainPaddingTop = parseFloat(
        getComputedStyle($container.current).getPropertyValue("padding-top")
      );
      headerSize += mainPaddingTop;
    }

    document.documentElement.style.setProperty(
      "--header-size",
      `${headerSize}px`
    );
  });

  return (
    <div className={styles.container} ref={$container}>
      <ul className={styles.linksList} ref={$linksList}>
        <li>
          <NavLink to="" className={styles.navItem}>
            <h3 className={styles.about}>About</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="acknowledgments" className={styles.navItem}>
            <h3>Acknowledgments</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="the-tech" className={styles.navItem}>
            <h3>Technologies Used</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="what-is-missing" className={styles.navItem}>
            <h3>What is missing?</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="me" className={styles.navItem}>
            <h3>Me!</h3>
          </NavLink>
        </li>
      </ul>

      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}
