import { useContext } from "react";
import { Link } from "react-router-dom";

import useRecs from "../hooks/useRecs";
import { NewRec } from "../components/NuevaRecomendacion";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components/Loading";
import { MensajeError } from "../components/MensajeError";

export const Post = () => {
  //   const { token } = useContext(AuthContext);
  const { error, loading, addRec } = useRecs();
  const { user } = useContext(AuthContext);

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <>
      {user ? (
        <NewRec addRec={addRec} />
      ) : (
        <>
          {" "}
          <p>
            Necesitas estar registrado para poder publicar una recomendación
          </p>{" "}
          <Link to="/registro">
            <button>Regístrate</button>
          </Link>
        </>
      )}
    </>
  );
};
