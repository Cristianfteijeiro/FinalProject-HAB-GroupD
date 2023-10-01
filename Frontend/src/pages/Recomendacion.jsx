import { useParams } from "react-router-dom";
import { useRec } from "../hooks/useRec";

import { RecDetalle } from "../components/DetalleRecomendacion";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";

export const RecPage = () => {
  const { id } = useParams();
  const { rec, error, loading } = useRec(id);

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section className="rec-detalle-page">
      <RecDetalle rec={rec} />
    </section>
  );
};
