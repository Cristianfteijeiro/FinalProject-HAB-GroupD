const getDB = require("../../database/db");

const getAllRec = async (req, res) => {
  try {
    const connect = await getDB();

    const [rec] = await connect.query(
      `SELECT
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
            CASE 
              WHEN ROUND(IFNULL(AVG(v.votos), 0), 1) = ROUND(IFNULL(AVG(v.votos), 0), 0) 
              THEN CAST(ROUND(IFNULL(AVG(v.votos), 0), 0) AS UNSIGNED)
              ELSE ROUND(IFNULL(AVG(v.votos), 0), 1)
            END AS promedio_votos,
            COUNT(c.comentarios) AS cantidad_comentarios
    FROM recomendaciones r
    LEFT JOIN votos v ON r.id = v.recomendacion_id
    LEFT JOIN usuarios u ON r.user_id = u.id
    LEFT JOIN comentarios c ON r.id = c.recomendacion_id
    GROUP BY r.id, r.titulo, r.categoria, r.lugar, r.entradilla, r.texto, r.foto, r.fecha_creacion, r.user_id
    ORDER BY r.fecha_creacion DESC`
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      data: rec,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllRec;
