import { Link } from "react-router-dom";

// import { Auth } from "./Auth";

export const Header = () => {
  return (
    <header>
      <span>
        <Link to={"/"}>
          <img src="src/assets/images/HAT3.png" />
        </Link>
      </span>
      <nav>
        {/* <Auth /> */}
        <ul>
          <li>
            <Link to={"/register"}>Regístrate</Link>
          </li>
          <li>
            <Link to={"/login"}>Mi Cuenta</Link>
          </li>
          <li>
            <Link to={"/conocenos"}>Conócenos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
