const getDB = require("../../database/db");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  let connect;

  try {
    connect = await getDB();

    const { mail, pwd } = req.body;

    if (!mail || !pwd) return res.status(400).send("Faltan datos");
    const [user] = await connect.query(
      `
                SELECT id, role, active
                FROM usuarios
                WHERE email = ? AND contraseña = SHA2(?,512)
            `,
      [mail, pwd]
    );

    if (!user.length)
      return res.status(404).send("Usuario o contraseña incorrecta");

    const info = {
      id: user[0].id,
      role: user[0].role,
    };

    const token = jwt.sign(info, process.env.SECRET_TOKEN, { expiresIn: "1d" });

    res.status(200).send({
      status: "OK",
      message: "Login",
      data: token,
    });
    connect.release();
  } catch (error) {
    console.log(error);
  } finally {
    if (connect) {
      connect.release();
    }
  }
};

module.exports = loginUser;
