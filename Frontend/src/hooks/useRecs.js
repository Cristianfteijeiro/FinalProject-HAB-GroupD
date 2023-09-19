import { useEffect, useState } from "react";
import { getAllRecsService, getUserRecsService } from "../services";

const useRecs = (id) => {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecs = async () => {
      try {
        setLoading(true);
        const data = id
          ? await getUserRecsService(id)
          : await getAllRecsService();

        setRecs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecs();
  }, [id]);

  const addRec = (data) => {
    setRecs([data, ...recs]);
  };

  const removeRec = (id) => {
    setRecs(recs.filter((rec) => rec.id !== id));
  };

  return { recs, error, loading, addRec, removeRec };
};

export default useRecs;
