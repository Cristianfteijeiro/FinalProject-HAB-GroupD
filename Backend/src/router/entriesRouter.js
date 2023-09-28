const express = require("express");

const router = express.Router();

const userLogged = require("../middlewares/userLogged");
const recExists = require("../middlewares/recExists");
const canDelete = require("../middlewares/canDelete");

const {
  postRecomendation,
  getRecomendationById,
  getRecomendationByPlace,
  getRecomendationByCategory,
  voteRec,
  getRecByVote,
  postComment,
  deleteRec,
  getAllRec,
} = require("../controllers/entries");

router.post("/recomendaciones", userLogged, postRecomendation);
router.post("/recomendaciones/:idRec/votar", userLogged, recExists, voteRec);
router.post(
  "/recomendaciones/:idRec/comentarios",
  userLogged,
  recExists,
  postComment
);

router.get("/recomendaciones", getAllRec);
router.get("/recomendaciones/ordenar-por-votos", getRecByVote);
router.get("/recomendaciones/:idRec", recExists, getRecomendationById);
router.get("/recomendaciones/lugar/:place", getRecomendationByPlace);
router.get("/recomendaciones/categoria/:category", getRecomendationByCategory);

router.delete(
  "/recomendaciones/:idRec",
  userLogged,
  recExists,
  canDelete,
  deleteRec
);

module.exports = router;
