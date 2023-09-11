import React from "react";
import { useContext, useState } from "react";
import "../Styles/Post.css";

export const Post = () => {
  //   const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    // try {
    //   setLoading(true);
    //   const data = new FormData(e.target);
    //   const tweet = await sendTweetService({ data, token });

    //   addTweet(tweet);

    //   e.target.reset();
    //   setImage(null);
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="post">
      <section>
        <h1>RECOMENDACIÓN</h1>
        <form className="new-post" onSubmit={handleForm}>
          <fieldset>
            <label htmlFor="titulo">Título</label>
            <input type="text" name="titulo" id="titulo" required />
          </fieldset>
          <fieldset>
            <label htmlFor="entradilla">Entradilla</label>
            <input type="text" name="entradilla" id="entradilla" required />
          </fieldset>
          <fieldset>
            <label htmlFor="lugar">Lugar</label>
            <input type="text" name="lugar" id="lugar" required />
          </fieldset>
          <fieldset>
            <label htmlFor="categoria">Categoría</label>
            {/* <input type="text" name="categoria" id="categoria" required /> */}
            <select name="categoria" id="categoria" required>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="texto">Texto</label>
            <input
              className="inputText"
              type="text"
              name="texto"
              id="texto"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="imagen">Imagen</label>
            <input
              type="file"
              name="imagen"
              id="imagen"
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
          {loading ? <p>posting tweet...</p> : null}
        </form>
      </section>

      <figure>
        <img src="src/assets/images/equipaje.jpg" />
      </figure>
    </div>
  );
};
