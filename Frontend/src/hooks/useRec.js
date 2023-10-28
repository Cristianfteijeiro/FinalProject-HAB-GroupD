// useRec.js

import { useEffect, useState } from "react";
import { getSingleRecService, deleteCommentService } from "../services";

const useRec = (id) => {
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRec = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
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

  const updateComments = async (commentId, token, setComments) => {
    try {
      await deleteCommentService({ idCom: commentId, token });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  return { rec, error, loading, updateComments };
};

export default useRec;
