const getDB = require("../../database/db");

const getUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const connect = await getDB();

    const [user] = await connect.query(
      `SELECT fecha_registro, email, nombre, avatar FROM usuarios WHERE id=?`,
      [idUser]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      data: user,
      tokenInfo: req.userInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUser;
