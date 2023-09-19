
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deleteRecService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const Rec = ({ rec, removeRec }) => {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");


  if (!rec) {
    return null;
  }

  const deleteRec = async (id) => {
    try {
      await deleteRecService({ id, token });
      console.log(`${baseURL}/uploads/recPhoto/${rec.foto}`);

      if (removeRec) {
        removeRec(id);
      } else {
        navigate("/recomendaciones");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="rec">
      <h2>{rec.titulo}</h2>
      <p>{rec.texto}</p>
      {rec.foto ? (
        <img
          src={`${baseURL}/uploads/recPhoto/${rec.foto}`}
          alt={rec.texto}
        />
      ) : null}
      <p>
        By <Link to={`/usuarios/${rec.user_id}`}>{rec.nombre}</Link> on{" "}
        <Link to={`/recomendaciones/${rec.id}`}>
          {new Date(rec.fecha_creacion).toLocaleString()}
        </Link>
      </p>
      {user && user.id === rec.user_id ? (
        <section>
          <button
            onClick={() => {
              if (window.confirm("¿Estás seguro?")) deleteRec(rec.id);
            }}
          >
            Recomendación eliminada.
          </button>
          {error ? <p>{JSON.stringify(error)}</p> : null}
        </section>
      ) : null}
    </article>
  );
};