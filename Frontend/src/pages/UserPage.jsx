import "../styles/UserPage.css";

import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { MensajeError } from "../components/MensajeError";
import { UserRecs } from "../components/UserRecs";
import { Loading } from "../components/Loading";

const baseURL = import.meta.env.VITE_API_URL;

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  console.log(user);

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section className="user-page">
      <section className="user-data">
        <h1>User: {user[0].nombre}</h1>

        <p>
          Fecha de registro: {new Date(user[0].fecha_registro).toLocaleString()}
        </p>
        {user[0].avatar ? (
          <img
            className="user-avatar user-page-avatar"
            src={`${baseURL}/uploads/avatarUser/${user[0].avatar}`}
            alt={user[0].nombre}
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Avatar"
          />
        )}
      </section>
      <section className="user-recs">
        <UserRecs id={user[0].id} />
      </section>
    </section>
  );
};
