import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendRecService } from "../services";
import { useNavigate } from "react-router-dom";

export const NewRec = ({ addRec }) => {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData(e.target);
      const rec = await sendRecService({ data, token });

      addRec(rec);

      e.target.reset();
      setImage(null);
      navigate("/recomendaciones");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mispost">
      <section>
        <h1>Añadir nueva recomendación</h1>
        <form className="new-post" onSubmit={handleForm}>
          <fieldset>
            <label htmlFor="titulo">Título</label>
            <input type="text" name="title" id="title" required />
          </fieldset>
          <fieldset>
            <label htmlFor="entradilla">Entradilla</label>
            <input type="text" name="intro" id="intro" required />
          </fieldset>
          <fieldset>
            <label htmlFor="lugar">Lugar</label>
            <input type="text" name="place" id="place" required />
          </fieldset>
          <fieldset>
            <label htmlFor="categoria">Categoría</label>
            {/* <input type="text" name="categoria" id="categoria" required /> */}
            <input type="text" name="category" id="category" required></input>
          </fieldset>
          <fieldset>
            <label htmlFor="texto">Texto</label>
            <input
              className="inputText"
              type="text"
              name="text"
              id="text"
              required
            />
          </fieldset>
          <fieldset>
            <label className="upload-image">
              <input
                type="file"
                name="image"
                accept="image/"
                onChange={(e) => setImage(e.target.files[0])}
                className="input-file"
              />

              <figure>
                <figcaption>Subir Imagen</figcaption>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke= "var(--action)"
                  className="recom"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </figure>
            </label>
          </fieldset>
          <button>Subir Recomendación</button>
          {error ? <p>{error}</p> : null}
          {loading ? <p>añadiendo recomendación...</p> : null}
        </form>
      </section>
      {image ? (
        <figure>
          <img
            src={URL.createObjectURL(image)}
            className="preview"
            alt="Preview"
          />
        </figure>
      ) : (
        <figure>
          <img src="src/assets/images/equipaje.jpg" />
        </figure>
      )}
    </div>
  );
};
