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
      <Link to={`/recomendaciones/${rec.id}`}>
        <h2>{rec.titulo}</h2>
        {rec.foto ? (
          <img
            src={`${baseURL}/uploads/recPhoto/${rec.foto}`}
            alt={rec.texto}
          />
        ) : null}
      </Link>
      <p>{rec.texto}</p>
      {rec.avatar ? (
        <img
          className="user-avatar"
          src={`${baseURL}/uploads/avatarUser/${rec.avatar}`}
          alt={rec.nombre}
        />
      ) : (
        <img
          className="user-avatar"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Avatar"
        />
      )}

      <p>
        <Link to={`/usuarios/${rec.user_id}/recs`}>{rec.nombre}</Link> hace{" "}
        {new Date(rec.fecha_creacion).toLocaleString()}
      </p>
      {user && user.id === rec.user_id ? (
        <section>
          <button
            onClick={() => {
              if (window.confirm("¿Estás seguro?")) deleteRec(rec.id);
            }}
          >
            Eliminar recomendación
          </button>
          {error ? <p>{JSON.stringify(error)}</p> : null}
        </section>
      ) : null}
    </article>
  );
};
