import "../Styles/recomendacion.css";

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

  // Envuelve todo el contenido en un Link adicional
  return (
    <article className="recomendacion">
      <Link to={`/recomendaciones/${rec.id}`} className="recomendacion-link">
        <h2>{rec.titulo}</h2>
        {rec.foto ? (
          <img
            className="recomendacion-img"
            src={`${baseURL}/uploads/recPhoto/${rec.foto}`}
            alt={rec.texto}
          />
        ) : null}
        <p>{rec.entradilla}</p>
        <p>
          {rec.promedio_votos === "0.0" ? null : rec.promedio_votos}{" "}
          {rec.promedio_votos === "0.0" ? null : "/10"}
        </p>
      </Link>
      <div className="recomendacion-info">
        <div>
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
          <Link to={`/usuarios/${rec.user_id}/recs`}>{rec.nombre}</Link>
        </div>
        <p>
          hace{" "}
          <Link to={`/recomendaciones/${rec.id}`}>
            {new Date(rec.fecha_creacion).toLocaleString()}
          </Link>
        </p>
        {user && user.id === rec.user_id ? (
          <section>
            <button
              className="btn-eliminar"
              onClick={() => {
                if (window.confirm("¿Estás seguro?")) deleteRec(rec.id);
              }}
            >
              <figure>
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </figure>
            </button>
            {error ? <p>{JSON.stringify(error)}</p> : null}
          </section>
        ) : null}
      </div>
    </article>
  );
};
