import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import useRec from "../hooks/useRec";
// import { sendCommentService } from "../services";

export const NewComment = ({ id, addComment }) => {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const { addComment } = useRec();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData(e.target);
      // const comment = await sendCommentService({ id, data, token });

      addComment(id, data, token);

      e.target.reset();
      // window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form className="new-comment" onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="comment">
            <input
              className="inputText"
              type="text"
              id="comment"
              name="comment"
              placeholder="Añade tu comentario..."
              required
            />
          </label>
          <button className="recom">Publicar</button>
        </fieldset>
      </form>
    </div>
  );
};
