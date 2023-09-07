const express = require("express");

const router = express.Router();

const userLogged = require("../middlewares/userLogged");

const { createUser, loginUser, avatarUser } = require("../controllers/users");

router.post("/usuarios", createUser);
router.post("/usuarios/login", loginUser);

router.put("/usuarios/:idUser", userLogged, avatarUser);

module.exports = router;
