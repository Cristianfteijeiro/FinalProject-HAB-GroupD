import "../Styles/recomendacion.css";
import "../Styles/RecDetalle.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deleteRecService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { Rating } from "./Rating";

export const RecDetalle = ({ rec, removeRec }) => {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(rec.userRating || 1);

  const handleUserRating = (newRating) => {
    // Aquí puedes implementar la lógica para enviar la puntuación al servidor o actualizarla en algún otro lugar
    setUserRating(newRating);
  };

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
          <>
            <Link to={`/usuarios/${rec.recomendacion.user_id}/recs`}>
              <img
                className="user-avatar"
                src={`${baseURL}/uploads/avatarUser/${rec.recomendacion.avatar}`}
                alt={rec.recomendacion.nombre}
              />
            </Link>
          </>
        ) : (
          <>
            <Link to={`/usuarios/${rec.recomendacion.user_id}/recs`}>
              <img
                className="user-avatar"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Avatar"
              />
            </Link>
          </>
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
      <Rating
        initialValue={userRating}
        onRate={handleUserRating}
        recId={rec.recomendacion.id}
      />
      <p>
        Media de votos:{" "}
        {rec.recomendacion.promedio_votos === "0.00"
          ? "Esta recomendación aún no tiene votos"
          : rec.recomendacion.promedio_votos}
      </p>
      <p>Ver {rec.recomendacion.cantidad_comentarios} comentarios</p>
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
