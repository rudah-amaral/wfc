import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <h4 className={styles.title}>You can find me on:</h4>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.contactLocation}>GitHub</span>
            <a
              href="https://www.github.com/rudah-amaral"
              className={styles.link}
            >
              rudah-amaral
            </a>
          </li>
          <li className={styles.listItem}>
            <span className={styles.contactLocation}>LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/rudahamaral/"
              className={styles.link}
            >
              rudahamaral
            </a>
          </li>
          <li className={styles.listItem}>
            <span className={styles.contactLocation}>Mastodon</span>
            <a href="https://hachyderm.io/@rud___boy" className={styles.link}>
              @rud___boy@hachyderm.io
            </a>
          </li>
          <li className={styles.listItem}>
            <span className={styles.contactLocation}>Email</span>
            <a href="mailto:rudah.dev@gmail.com" className={styles.link}>
              rudah.dev@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
