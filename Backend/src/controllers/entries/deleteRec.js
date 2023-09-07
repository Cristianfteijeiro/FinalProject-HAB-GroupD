const getDB = require("../../database/db");

const deleteRec = async (req, res) => {
  try {
    const connect = await getDB();

    const { idRec } = req.params;

    await connect.query(`DELETE FROM votos WHERE recomendacion_id=?`, [idRec]);

    await connect.query(`DELETE FROM recomendaciones WHERE id=?`, [idRec]);

    connect.release();

    res.status(200).send({
      status: "OK",
      message: `La recomendación con id: ${idRec} y todos sus elementos fueron eliminados`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteRec;
