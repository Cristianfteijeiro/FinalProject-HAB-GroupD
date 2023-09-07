const getDB = require("../../database/db");

const getRecomendationById = async (req, res) => {
  try {
    const { idRec } = req.params;

    const connect = await getDB();

    // Consulta para obtener los datos de la recomendación
    const [recomendationResult] = await connect.query(
      `
      SELECT
        r.titulo,
        r.categoria,
        r.lugar,
        r.entradilla,
        r.texto,
        r.foto,
        ROUND(IFNULL(AVG(v.votos), 0), 2) AS promedio_votos
      FROM recomendaciones r
      LEFT JOIN votos v ON r.id = v.recomendacion_id
      WHERE r.id = ?
      GROUP BY r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto;
      `,
      [idRec]
    );

    // Consulta para obtener los comentarios de la recomendación
    const [commentsResult] = await connect.query(
      `
      SELECT
        u.nombre AS nombre_usuario,
        u.avatar AS avatar_usuario,
        c.comentarios AS comentario
      FROM comentarios c
      LEFT JOIN usuarios u ON c.user_id = u.id
      WHERE c.recomendacion_id = ?;
      `,
      [idRec]
    );

    connect.release();

    const responseData = {
      status: "OK",
      data: {
        recomendacion: recomendationResult[0],
        comentarios: commentsResult,
      },
    };

    res.status(200).send(responseData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getRecomendationById;
