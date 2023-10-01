const getDB = require("../../database/db");

const createUser = async (req, res) => {
  const connect = await getDB();
  try {
    const { name, mail, pwd } = req.body;

    if (!name || !mail || !pwd)
      return res.status(400).json({ message: "Faltan datos" });

    const [existingUser] = await connect.query(
      `SELECT id FROM usuarios WHERE email = ? LIMIT 1`,
      [mail]
    );

    if (existingUser.length > 0) {
      connect.release();
      return res.status(409).send({
        status: "Error",
        message: "El usuario ya existe",
      });
    }

    const [user] = await connect.query(
      `INSERT INTO usuarios (nombre, email, contraseña) VALUES (?,?,SHA2(?,512))`,
      [name, mail, pwd]
    );

    res.status(200).send({
      status: "OK",
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = createUser;
