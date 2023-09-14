import { Link } from "react-router-dom";
import "../Styles/PopUp.css";
import { useContext, useState } from "react";
import { logInUserService } from "../services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PopUp = ({ onClose }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const token = await logInUserService({ mail, pwd: pass });

      login(token);
      onClose();
      navigate("/recomendaciones");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <form onSubmit={handleForm}>
          <fieldset>
            <input
              placeholder="Email"
              type="email"
              id="mail"
              name="mail"
              value={mail}
              required
              onChange={(e) => setMail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Contraseña"
              type="password"
              id="pass1"
              name="pass1"
              value={pass}
              required
              onChange={(e) => setPass(e.target.value)}
            />
          </fieldset>
          <button>Login</button>
          {error ? <p>{error}</p> : null}
        </form>
        <Link to={"/registro"}>
          <button>Registrate</button>
        </Link>
      </div>
    </div>
  );
};

export default PopUp;
