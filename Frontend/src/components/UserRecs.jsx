import useRecs from "../hooks/useRecs";
import { MensajeError } from "./MensajeError";
import { RecList } from "./RecList";

export const UserRecs = ({ id }) => {
  const { recs, loading, error, removeRec } = useRecs(id);
  console.log(recs);

  if (loading) return <p>Loading tweets...</p>;
  if (error) return <MensajeError message={error} />;

  return <RecList recs={recs} removeRec={removeRec} />;
};
