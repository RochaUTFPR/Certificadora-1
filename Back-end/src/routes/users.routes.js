const { Router } = require("express");

const usersController = require("../controllers/users.controller");

const {verifyAuthenticate} = require("../middlewares/verifyAuthentication")

const routes = Router();

routes.get("/users", usersController.list);

routes.get("/users/:id", usersController.getById);

routes.get("/usersLogged", verifyAuthenticate, usersController.getByLogged);

routes.post("/users", usersController.create);

routes.put("/users/:id", verifyAuthenticate, usersController.update);

routes.delete("/users/:id", verifyAuthenticate, usersController.remove);

module.exports = routes;