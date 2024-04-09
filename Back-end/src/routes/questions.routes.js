const { Router } = require("express");

const questionsController = require("../controllers/questions.controller");

const {verifyAuthenticate} = require("../middlewares/verifyAuthentication")

const routes = Router();

routes.get("/questions", verifyAuthenticate, questionsController.list);

routes.get("/questions/:id", verifyAuthenticate, questionsController.getById);

routes.get("/questionsspecific", verifyAuthenticate, questionsController.getByNumberLevel);

routes.post("/questions", questionsController.create);

routes.put("/questions/:id", questionsController.update);

routes.delete("/questions/:id", questionsController.remove);

module.exports = routes;