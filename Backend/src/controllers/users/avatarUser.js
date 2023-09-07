const getDB = require("../../database/db");

const { body } = require("express-validator");

const savePhoto = require("../../service/savePhoto");

const avatarUser = async (req, res) => {
  try {
    const connect = await getDB();

    const { idUser } = req.params;

    if (req.userInfo.id !== parseInt(idUser) && req.userInfo.role !== "admin") {
      return res
        .status(401)
        .send("No tiene permisos para modificar este usuario");
    }

    if (req.files && req.files.avatar) {
      const userAvatar = await savePhoto(req.files.avatar, "/avatarUser");

      await connect.query(
        `UPDATE usuarios
        SET avatar=?
        WHERE id=?`,
        [userAvatar, idUser]
      );
    }

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Avatar modificado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = avatarUser;
