import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
