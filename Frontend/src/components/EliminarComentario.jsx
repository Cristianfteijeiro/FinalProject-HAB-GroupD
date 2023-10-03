import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteCommentService } from "../services";

export const EliminarComentario = ({
  commentId,
  recId,
  recOwnerId,
  onDelete,
  commentOwnerId,
}) => {
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      console.log("commentId", commentId);
      console.log("recId", recId);
      console.log("recOwnerId", recOwnerId);

      // Verificar si el comentario pertenece al usuario o si es su recomendación
      if (user.id === recOwnerId || user.id === commentOwnerId) {
        // Llamar al servicio para eliminar el comentario
        await deleteCommentService({
          recId,
          idComment: commentId,
          token,
        });
        // Actualizar el estado local o hacer cualquier otra acción necesaria
        onDelete(commentId);
      } else {
        setError("No tienes permiso para eliminar este comentario.");
      }
    } catch (error) {
      setError(
        "Error al eliminar el comentario. Por favor, inténtalo de nuevo."
      );
      console.error(error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={handleDelete}>Eliminar Comentario</button>
    </div>
  );
};
