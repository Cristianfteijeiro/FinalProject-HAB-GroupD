const getDB = require("../../database/db");

const getUserById = async (req, res, id) => {
  let connection;

  try {
    connection = await getDB();

    const [result] = await connection.query(
      `SELECT fecha_registro, email, nombre, avatar FROM usuarios WHERE id=?`,
      [id]
    );

    if (result.length === 0) {
      throw new Error("No hay ningún usuario con esa id", 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getMeController = async (req, res, next) => {
  try {
    console.log(req.userId);
    const user = await getUserById(req, res, req.userId);

    res.send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getMeController;
