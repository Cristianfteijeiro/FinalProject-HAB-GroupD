import { Link } from "react-router-dom";

// import { Auth } from "./Auth";

export const Header = () => {
  return (
    <header>
      <span className="logo">
        <Link to={"/"}>
          <img src="../src/assets/images/HAT3.png" />
        </Link>
      </span>

      {/* <div class="container">
        <input type="text" placeholder="Buscar" />
        <div class="btn">
          <i class="fa fa-search"></i>
        </div>
      </div> */}

      <form className="buscadorHome" action="">
        <input type="search" placeholder=" Buscar..." className="buscar" />
        <button className="recom">Buscar</button>
      </form>

      <nav>
        {/* <Auth /> */}
        <ul>
          {/* <li>
            <Link to={"/register"}>Regístrate</Link>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li> */}
          <li className="recom">
            <Link to={"/recomendaciones"}>Recomendaciones</Link>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li>
          <li className="moñeco">
            <Link to={"/register"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
          </li>

          {/* <li>
            <Link to={"/conocenos"}>Conócenos</Link>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};
