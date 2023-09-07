const getDB = require("../../database/db");

const voteRec = async (req, res) => {
  try {
    const connect = await getDB();

    const { idRec } = req.params;
    const idUser = req.userInfo.id;
    const { vote } = req.body;

    if (!vote || vote > 10 || vote < 1) {
      return res.status(400).send("Voto no válido, debe ser entre 1 y 10");
    }

    const [rec] = await connect.query(
      `
                SELECT user_id
                FROM recomendaciones
                WHERE id=?
            `,
      [idRec]
    );

    if (rec[0].user_id === idUser) {
      return res.status(403).send("No puedes votar tu propia entrada");
    }

    const [existingVote] = await connect.query(
      `
                SELECT id
                FROM votos
                WHERE user_id=? AND recomendacion_id=?
            `,
      [idUser, idRec]
    );

    if (existingVote.length > 0)
      return res
        .status(403)
        .send("No puedes votar dos veces la misma recomendación");

    await connect.query(
      `
                INSERT INTO votos (votos, user_id, recomendacion_id)
                VALUES (?,?,?)
            `,
      [vote, idUser, idRec]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Has votado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = voteRec;
