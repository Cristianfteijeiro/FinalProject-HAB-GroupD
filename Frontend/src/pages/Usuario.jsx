import { useParams } from "react-router-dom";
import { useState } from "react";
import { uploadAvatarService } from "../services";

import { UserRecs } from "../components/RecomendacionesUsuario";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";

import useUser from "../hooks/useUser";

import "../Styles/Usuario.css";

const baseURL = import.meta.env.VITE_API_URL;

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarError, setAvatarError] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await uploadAvatarService(avatarFile, user[0].id, token);
      console.log(response);
      window.location.reload();
    } catch (error) {
      setAvatarError(
        "Error al subir el avatar. Por favor, inténtalo de nuevo."
      );
      console.error(error);
    }
  };

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
        <section className="user-avatar">
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          <button onClick={handleAvatarUpload}>Subir Avatar</button>
          {avatarError && <p>{avatarError}</p>}
        </section>
      </section>
      <section className="user-recs">
        <UserRecs id={user[0].id} />
      </section>
    </section>
  );
};
