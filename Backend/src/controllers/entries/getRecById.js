const getDB = require("../../database/db");

const getRecomendationById = async (req, res) => {
  try {
    const { idRec } = req.params;

    const connect = await getDB();

    // Consulta para obtener los datos de la recomendación
    const [recomendationResult] = await connect.query(
      `
      SELECT
            r.id,
            r.titulo,
            r.categoria,
            r.lugar,
            r.entradilla,
            r.texto,
            r.foto,
            r.fecha_creacion,
            r.user_id,
            u.nombre,
            u.avatar,
            ROUND(IFNULL(AVG(v.votos), 0), 2) AS promedio_votos,
            COUNT(c.comentarios) AS cantidad_comentarios
    FROM recomendaciones r
    LEFT JOIN votos v ON r.id = v.recomendacion_id
    LEFT JOIN usuarios u ON r.user_id = u.id
    LEFT JOIN comentarios c ON r.id = c.recomendacion_id
    WHERE r.id = ?
    GROUP BY r.id, r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, r.fecha_creacion, r.user_id;
      `,
      [idRec]
    );

    // Consulta para obtener los comentarios de la recomendación
    const [commentsResult] = await connect.query(
      `
      SELECT
        u.nombre AS nombre_usuario,
        u.avatar AS avatar_usuario,
        c.comentarios AS comentario,
        c.fecha_creacion,
        c.id
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
