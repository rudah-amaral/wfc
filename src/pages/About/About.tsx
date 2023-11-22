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

  useEffect(() => {
    if (!$linksList.current) return;
    const list = $linksList.current;

    function handleEvent(e: MouseEvent) {
      if (!e.target) return;
      const elem = e.target as HTMLElement;

      if (elem.tagName !== "A") return;
      window.scrollTo({ top: 0 });
    }

    list.addEventListener("click", handleEvent);

    return () => {
      if (!list) return;

      list.removeEventListener("click", handleEvent);
    };
  });

  return (
    <div className={styles.container} ref={$container}>
      <ul className={styles.linksList} ref={$linksList}>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>
            <NavLink to="" className={styles.listLink}>
              About
            </NavLink>
          </h3>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>
            <NavLink to="acknowledgments" className={styles.listLink}>
              Acknowledgments
            </NavLink>
          </h3>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>
            <NavLink to="the-tech" className={styles.listLink}>
              Technologies Used
            </NavLink>
          </h3>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>
            <NavLink to="what-is-missing" className={styles.listLink}>
              What is missing?
            </NavLink>
          </h3>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>
            <NavLink to="me" className={styles.listLink}>
              Me!
            </NavLink>
          </h3>
        </li>
      </ul>

      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}
