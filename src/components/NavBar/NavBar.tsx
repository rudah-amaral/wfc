import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function NavBar() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
