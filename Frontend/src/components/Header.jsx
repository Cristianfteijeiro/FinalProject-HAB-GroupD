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
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li>
          <li>
            <Link to={"/login"}>Mi Cuenta</Link>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li>
          <li>
            <Link to={"/register"}>Recomendaciones</Link>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li>
          <li>
            <Link to={"/conocenos"}>Conócenos</Link>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li>
        </ul>
      </nav>
    </header>
  );
};
