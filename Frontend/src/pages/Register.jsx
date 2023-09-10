import { useState } from "react";

export const Register = () => {
  const [nick, setNick] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
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
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email2">Repite tu Email</label>
            <input
              type="email"
              id="email2"
              name="email2"
              value={email2}
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
        </form>
      </section>
      <span>
        <img src="src/assets/images/equipaje.jpg" />
      </span>
    </div>
  );
};
