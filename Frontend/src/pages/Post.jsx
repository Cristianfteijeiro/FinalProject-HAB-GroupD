import useRecs from "../hooks/useRecs";
import { useContext } from "react";
import "../Styles/Post.css";
import { NewRec } from "../components/NewRec";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components/Loading";
import { MensajeError } from "../components/MensajeError";

export const Post = () => {
  //   const { token } = useContext(AuthContext);
  const { error, loading, addRec } = useRecs();
  const { user } = useContext(AuthContext);

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return <>{user ? <NewRec addRec={addRec} /> : null}</>;
};
