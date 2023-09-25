const jwt = require("jsonwebtoken");
const getDB = require("../database/db");
// const { generateError } = require("../helpers");

const authUser = async (req, res, next) => {
  const connect = await getDB();
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send("Falta cabecera de autenticación");
    }

    // Comprobamos que el token sea correcto
    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET_TOKEN);
      //   console.log(token.id);
      //   console.log(userId);
    } catch {
      throw new error("Token incorrecto", 401);
    }

    // Metemos la información del token en la request para usarla en el controlador
    req.userId = token.id;

    connect.release();

    // Saltamos al controlador
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
