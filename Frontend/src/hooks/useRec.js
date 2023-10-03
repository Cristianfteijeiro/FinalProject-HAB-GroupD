import { useEffect, useState } from "react";
import { getSingleRecService } from "../services";

export const useRec = (id) => {
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRec = async () => {
      try {
        setLoading(true);
        // Simular un retraso de 1 segundo para demostrar el componente de carga
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getSingleRecService(id);

        setRec(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRec();
  }, [id]);

  return { rec, error, loading };
};
