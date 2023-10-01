import { useParams } from "react-router-dom";

import { UserRecs } from "../components/RecomendacionesUsuario";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";

import useUser from "../hooks/useUser";

import "../Styles/Usuario.css";

const baseURL = import.meta.env.VITE_API_URL;

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section className="user-page">
      <section className="user-data">
        {user[0].avatar ? (
          <img
            className="user-page-avatar"
            src={`${baseURL}/uploads/avatarUser/${user[0].avatar}`}
            alt={user[0].nombre}
          />
        ) : (
          <img
            className="user-page-avatar"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Avatar"
          />
        )}
        <p>Nick: {user[0].nombre}</p>

        <p>
          Usuario desde: {new Date(user[0].fecha_registro).toLocaleString()}
        </p>
      </section>
      <section className="user-recs">
        <UserRecs id={user[0].id} />
      </section>
    </section>
  );
};
