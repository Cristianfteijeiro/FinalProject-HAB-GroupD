const getDB = require("../../database/db");

const postComment = async (req, res) => {
  try {
    const connect = await getDB();

    const { idRec } = req.params;
    const idUser = req.userInfo.id;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send("El comentario es obligatorio");
    }

    await connect.query(
      `
                INSERT INTO comentarios (comentarios, user_id, recomendacion_id)
                VALUES (?,?,?)
            `,
      [comment, idUser, idRec]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Comentario registrado",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postComment;
