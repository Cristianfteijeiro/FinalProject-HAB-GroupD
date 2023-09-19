// import { use } from "../../../Backend/src/router/userRouter";
import "../Styles/Recomendacion.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Recomendacion() {
  const { user, token } = useContext(AuthContext);

  return (
    <section>
      <div className="datos">
        <h1>POST DE PAISANO ALEATORIO</h1>
        <h2>TÍTULO</h2>
        <p>Lugar</p>
        <p>Entradilla</p>
        <p>Texto</p>
        <ul>
          <li>*</li>
          <li>*</li>
          <li>*</li>
        </ul>
      </div>
      <div>
        <img src="../src/assets/images/playa.jpg" />
      </div>
    </section>
  );
}
