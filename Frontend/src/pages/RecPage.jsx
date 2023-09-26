import { useParams } from "react-router-dom";
import { useRec } from "../hooks/useRec";
import { RecDetalle } from "../components/RecDetalle";
// import { Comentarios } from "../components/Comentarios";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";

export const RecPage = () => {
  const { id } = useParams();
  const { rec, error, loading } = useRec(id);
  // console.log(rec);

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section className="rec-detalle-page">
      <h1>Recomendación</h1>
      <RecDetalle rec={rec} />
    </section>
  );
};
