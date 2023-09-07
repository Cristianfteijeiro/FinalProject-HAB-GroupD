const getDB = require("../../database/db");

const getRecomendationById = async (req, res) => {
  try {
    const { idRec } = req.params;

    const connect = await getDB();

    const [result] = await connect.query(
      `
            SELECT r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, v.votos, c.comentarios
            FROM recomendaciones r
            LEFT JOIN votos v ON r.id = v.recomendacion_id
            LEFT JOIN comentarios c ON r.id = c.recomendacion_id
            WHERE r.id=?`,
      [idRec]
    );

    connect.release();
    res.status(200).send({
      status: "OK",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getRecomendationById;
