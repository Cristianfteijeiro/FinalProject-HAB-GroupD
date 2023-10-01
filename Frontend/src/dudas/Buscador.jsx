import React from "react";
import { useContext, useState } from "react";
import "../Styles/Buscador.css";

export const Buscador = () => {
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
    <div className="buscador">
      <section>
        <h1>BUSCADOR</h1>
        <form className="new-post" onSubmit={handleForm}>
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
            <label htmlFor="lugar">Lugar</label>
            <input type="text" name="lugar" id="lugar" required />
          </fieldset>
          <button>LOS MÁS VOTADOS</button>
        </form>
      </section>

      <figure>
        <img src="src/assets/images/equipaje.jpg" />
      </figure>
    </div>
  );
};
