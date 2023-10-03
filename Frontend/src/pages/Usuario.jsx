import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { uploadAvatarService } from "../services";

import { UserRecs } from "../components/RecomendacionesUsuario";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";

import { AuthContext } from "../context/AuthContext";

import useUser from "../hooks/useUser";

import "../Styles/Usuario.css";

const baseURL = import.meta.env.VITE_API_URL;

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarError, setAvatarError] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [isNameEdited, setIsNameEdited] = useState(false);

  const { user: loggedUser } = useContext(AuthContext);
  console.log(loggedUser);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNewUserName(newName);
    setIsNameEdited(true);
  };
  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await uploadAvatarService(
        avatarFile,
        user[0].id,
        isNameEdited ? newUserName : user[0].nombre, // Usa el nuevo nombre solo si ha sido editado
        token
      );
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
        {loggedUser.id === user[0].id ? (
          <section className="user-update">
            <label>
              Nuevo Nombre:{" "}
              {/* Agrega un campo de entrada para el nuevo nombre */}
              <input
                type="text"
                value={newUserName}
                onChange={handleNameChange}
              />
            </label>
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="input-file"
              />

              <figure>
                <figcaption>Editar avatar</figcaption>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="recom"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </figure>
            </label>
            {/* <input type="file" accept="image/*" onChange={handleAvatarChange} /> */}
            <figure onClick={handleAvatarUpload}>
              <figcaption>Confirmar cambios</figcaption>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="var(--action)"
                className="recom userUpdate-button"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </figure>
            {avatarError && <p>{avatarError}</p>}
          </section>
        ) : null}
        {avatarFile ? (
          <figure className="preview-image">
            <img
              src={URL.createObjectURL(avatarFile)}
              className="preview"
              alt="Preview"
            />
          </figure>
        ) : null}
      </section>
      <section className="user-recs">
        <UserRecs id={user[0].id} />
      </section>
    </section>
  );
};
