import { useParams } from "react-router-dom";
import { useRec } from "../hooks/UseRec";
import { Rec } from "../components/Recomendacion";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";

export const RecPage = () => {
  const { id } = useParams();
  const { rec, error, loading } = useRec(id);
  console.log(rec);

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section>
      <h1>Recomendación</h1>
      <Comentarios rec={rec.comentarios} />
    </section>
  );
};
