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
    <>
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
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept={"image/*"}
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image ? (
            <figure>
              <img src={URL.createObjectURL(image)} alt="Preview" />
            </figure>
          ) : null}
        </fieldset>
        <button>Subir Recomendación</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>añadiendo recomendación...</p> : null}
      </form>
    </>
  );
};
