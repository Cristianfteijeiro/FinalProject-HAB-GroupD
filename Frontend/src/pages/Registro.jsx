import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUserService } from "../services";

import "../Styles/Registro.css";

export const Register = () => {
  const navigate = useNavigate();

  const [nick, setNick] = useState("");
  const [mail, setEmail] = useState("");
  const [mail2, setEmail2] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    if (mail !== mail2) {
      setError("Los correos no coinciden");
      return;
    }

    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUserService({ name: nick, mail, pwd: pass1 });
      setError("");
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="register">
      <section>
        <h1>REGÍSTRATE</h1>
        <form onSubmit={handleForm}>
          <fieldset>
            <label htmlFor="nick">Nick</label>
            <input
              type="text"
              id="nick"
              name="nick"
              value={nick}
              required
              onChange={(e) => setNick(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="mail">Email</label>
            <input
              type="email"
              id="mail"
              name="mail"
              value={mail}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email2">Repite tu Email</label>
            <input
              type="email"
              id="mail2"
              name="mail2"
              value={mail2}
              required
              onChange={(e) => setEmail2(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="pass1">Contraseña</label>
            <input
              type="password"
              id="pass1"
              name="pass1"
              value={pass1}
              required
              onChange={(e) => setPass1(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="pass2">Repite tu Contraseña</label>
            <input
              type="password"
              id="pass2"
              name="pass2"
              value={pass2}
              required
              onChange={(e) => setPass2(e.target.value)}
            />
          </fieldset>
          <button>Aventúrate</button>
          {error ? <p>{JSON.stringify(error)}</p> : null}
          {registrationSuccess && (
            <p className="success-message">Usuario registrado correctamente</p>
          )}
        </form>
      </section>
      <figure>
        <img src="src/assets/images/equipaje.jpg" />
      </figure>
    </div>
  );
};
