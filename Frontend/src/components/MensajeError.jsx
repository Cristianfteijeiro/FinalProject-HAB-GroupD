import { Link } from "react-router-dom";

export const MensajeError = ({ message }) => {
  return (
    <section className="error">
      <h1>Error</h1>
      <p>{message}</p>
      <Link to={"/recomendaciones"}>Volver atrás</Link>
    </section>
  );
};
