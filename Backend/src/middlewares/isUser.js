const getDB = require("../database/db");
const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
  try {
    const connect = await getDB();
    const authorization = req.headers["authorization"];

    if (!authorization)
      return res
        .status(401)
        .json({ message: "Falta cabecera de autorizacion" });

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
    } catch (error) {
      return res.status(401).json({ message: "Token no valido" });
    }

    /**cmprobar que la fecha del token sea valida respecto a lastAuthUpdate */
    // const [user] = await connect.query(
    //   `
    //             SELECT lastAuthUpdate
    //             FROM usuarios
    //             WHERE id=?
    //         `,
    //   [tokenInfo.id]
    // );

    // const lastAuthUpdate = new Date(user[0].lastAuthUpdate);
    // const timeStampCreateToken = new Date(tokenInfo.iat * 1000);

    // if (timeStampCreateToken < lastAuthUpdate) {
    //   res.status(401).send("Token caducado");
    // }

    //añadir la informacion del token a la request
    req.userInfo = tokenInfo;

    connect.release();

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isUser;
