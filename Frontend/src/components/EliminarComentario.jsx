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
    <>
      {error && <p>{error}</p>}
      <button className="btn-eliminar" onClick={handleDelete}>
        <figure>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </figure>
      </button>
    </>
  );
};
