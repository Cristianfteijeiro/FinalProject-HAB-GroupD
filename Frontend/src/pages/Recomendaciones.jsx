import useRecs from "../hooks/useRecs";
import { RecList } from "../components/RecList";
import { MensajeError } from "../components/MensajeError";
/*import { NewTweet } from "../components/NewTweet";*/
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components/Loading";

export const Recomendaciones = () => {
  const { recs, error, loading, addTweet, removeRec } = useRecs();
  console.log(recs);
  /*const { user } = useContext(AuthContext);*/

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return <RecList recs={recs} removeRec={removeRec} />;
};
