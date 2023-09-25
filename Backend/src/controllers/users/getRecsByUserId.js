const getDB = require("../../database/db");

const getRecsByUserId = async (idUser) => {
  try {
    const connect = await getDB();

    const [result] = await connect.query(
      `
          SELECT r.*, u.nombre, u.avatar  FROM recomendaciones r LEFT JOIN usuarios u on r.user_id = u.id WHERE r.user_id = ?
    `,
      [idUser]
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getRecsByUserId;
