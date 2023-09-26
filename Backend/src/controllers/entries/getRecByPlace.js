const getDB = require("../../database/db");

const getRecomendationByPlace = async (req, res) => {
  try {
    const { place } = req.params;

    const connect = await getDB();

    const [result] = await connect.query(
      `
            SELECT r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, ROUND (IFNULL(AVG (v.votos),0),2) AS promedio_votos, COUNT(c.comentarios) AS cantidad_comentarios
            FROM recomendaciones r
            LEFT JOIN votos v ON r.id = v.recomendacion_id
            LEFT JOIN comentarios c ON r.id = c.recomendacion_id
            WHERE r.lugar=?
            GROUP BY r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto`,
      [place]
    );
    if (result.length === 0)
      return res
        .status(404)
        .json({ message: "No existe ninguna recomendación de ese lugar" });
    connect.release();
    res.status(200).send({
      status: "OK",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getRecomendationByPlace;
