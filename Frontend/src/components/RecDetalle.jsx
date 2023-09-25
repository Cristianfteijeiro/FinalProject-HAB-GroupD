import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deleteRecService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const RecDetalle = ({ rec, removeRec }) => {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  if (!rec) {
    return null;
  }

  console.log(rec);
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
    <>
      <article className="recomendacion rec-detalle">
        <h2>{rec.recomendacion.titulo}</h2>
        {rec.recomendacion.foto ? (
          <img
            src={`${baseURL}/uploads/recPhoto/${rec.recomendacion.foto}`}
            alt={rec.recomendacion.texto}
          />
        ) : null}
        <p>{rec.recomendacion.entradilla}</p>
        <p className="recDetalle-texto">{rec.recomendacion.texto}</p>

        {rec.recomendacion.avatar ? (
          <img
            className="user-avatar"
            src={`${baseURL}/uploads/avatarUser/${rec.recomendacion.avatar}`}
            alt={rec.recomendacion.nombre}
          />
        ) : (
          <img
            className="user-avatar"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Avatar"
          />
        )}
        <p>
          <Link to={`/usuarios/${rec.recomendacion.user_id}/recs`}>
            {rec.recomendacion.nombre}
          </Link>{" "}
          hace{" "}
          <Link to={`/recomendaciones/${rec.recomendacion.id}`}>
            {new Date(rec.recomendacion.fecha_creacion).toLocaleString()}
          </Link>
        </p>
        {user && user.id === rec.recomendacion.user_id ? (
          <section>
            <button
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                  deleteRec(rec.recomendacion.id);
              }}
            >
              Eliminar recomendación
            </button>
            {error ? <p>{JSON.stringify(error)}</p> : null}
          </section>
        ) : null}
      </article>
      {rec.comentarios && rec.comentarios.length > 0 && (
        <div className="comentarios">
          {rec.comentarios.map((comentario) => (
            <article key={comentario.id} className="comentario">
              <img
                className="user-avatar"
                src={`${baseURL}/uploads/avatarUser/${comentario.avatar_usuario}`}
                alt={comentario.nombre_usuario}
              />
              <p>{comentario.comentario}</p>
              <p>{new Date(comentario.fecha_creacion).toLocaleString()}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
};
