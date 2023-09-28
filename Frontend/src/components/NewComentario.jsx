// En el componente NewComment

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendCommentService } from "../services";
import { useNavigate } from "react-router-dom";

export const NewComment = ({ id, addComment }) => {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData(e.target);
      const comment = await sendCommentService({ id, data, token }); // Pasar data e id

      addComment(comment);

      e.target.reset();

      //   navigate(`/recomendaciones/${id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      window.location.reload();
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
              name="comment"
              placeholder="Comenta"
              required
            />
          </label>
          <button className="btn-submit">Enviar</button>
        </fieldset>
      </form>
    </div>
  );
};
