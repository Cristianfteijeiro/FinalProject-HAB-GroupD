const getDB = require("../../database/db");

const getRecomendationByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const connect = await getDB();

    const [result] = await connect.query(
      `
            SELECT r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, ROUND (IFNULL(AVG (v.votos),0),2) AS promedio_votos, COUNT(c.comentarios) AS cantidad_comentarios
            FROM recomendaciones r
            LEFT JOIN votos v ON r.id = v.recomendacion_id
            LEFT JOIN comentarios c ON r.id = c.recomendacion_id
            WHERE r.categoria=?
            GROUP BY r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, r.fecha_creacion;`,
      [category]
    );

    if (result.length === 0)
      return res
        .status(404)
        .send("No existe ninguna recomendación para esa categoría");
    connect.release();
    res.status(200).send({
      status: "OK",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getRecomendationByCategory;
