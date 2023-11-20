import { NavLink, Outlet } from "react-router-dom";

export default function About() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="">
            <h3>About</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="acknowledgments">
            <h3>Acknowledgments</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="what-is-wfc">
            <h3>What is Wave Function Collapse?</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="the-tech">
            <h3>Technologies Used</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to="me">
            <h3>Me!</h3>
          </NavLink>
        </li>
      </ul>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
