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
