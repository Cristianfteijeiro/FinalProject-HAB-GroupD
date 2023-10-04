import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="error-new-rec">
      <h1>404 Not Found</h1>
      <img src="/JT.gif" alt="" />
      <Link to={"/"} className="recom">
        Volver a Inicio
      </Link>
    </div>
  );
};
