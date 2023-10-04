import { Link } from "react-router-dom";

export const MensajeError = ({ message }) => {
  return (
    <section className="error-new-rec">
      <h1>{message}</h1>
      <img src="/JT.gif" alt="" />
      <Link className="recom" to={"/"}>
        Volver a Inicio
      </Link>
    </section>
  );
};
