import "../Styles/Recomendacion.css";
import "../Styles/RecDetalle.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { deleteRecService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { Rating } from "./Rating";
import { FormatoFecha } from "./FormatoFecha";

export const RecDetalle = ({ rec, removeRec }) => {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(rec.userRating || 1);
  const [userVoted, setUserVoted] = useState(false);

  useEffect(() => {
    if (user && rec.votos) {
      const userVotedRec = rec.votos.find(
        (voto) => voto.id_usuario === user.id
      );
      setUserVoted(!!userVotedRec);
    }
  }, [user, rec.votos]);

  const handleUserRating = (newRating) => {
    setUserRating(newRating);
  };

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
          {FormatoFecha(rec.recomendacion.fecha_creacion)}
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

      {/*   {user && user.id !== rec.recomendacion.user_id ? (
        <Rating
          initialValue={userRating}
          onRate={handleUserRating}
          recId={rec.recomendacion.id}
        />
      ) : null} */}

      {!userVoted && user && user.id !== rec.recomendacion.user_id && (
        <Rating
          initialValue={userRating}
          onRate={handleUserRating}
          recId={rec.recomendacion.id}
        />
      )}

      <p>
        Media de votos:{" "}
        {rec.recomendacion.promedio_votos === "0.00"
          ? "Esta recomendación aún no tiene votos"
          : rec.recomendacion.promedio_votos}{" "}
        ({rec.recomendacion.cantidad_votos} valoraciones)
      </p>

      <p>
        Esta recomendación tiene {rec.recomendacion.cantidad_comentarios}{" "}
        comentario
        {rec.recomendacion.cantidad_comentarios === 1 ? "" : "s"}
        {":"}
      </p>

      {rec.comentarios && rec.comentarios.length > 0 && (
        <div className="comentarios">
          {rec.comentarios.map((comentario) => (
            <article key={comentario.id} className="comentario">
              <img
                className="user-avatar"
                src={`${baseURL}/uploads/avatarUser/${comentario.avatar_usuario}`}
                alt={comentario.nombre_usuario}
              />
              <p>{comentario.nombre_usuario}</p>
              <p>{comentario.comentario}</p>
              <p>{FormatoFecha(comentario.fecha_creacion)}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
};
