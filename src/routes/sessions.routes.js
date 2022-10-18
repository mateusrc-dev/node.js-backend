const { Router } = require("express"); //importando a rota do express
const SessionsController = require("../Controllers/SessionsController"); //importando o controller de sessions
const sessionsController = new SessionsController(); //como o SessionsController é uma classe, vamos instanciar ela pra alocar pra ela um espaço na memória
const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsController.create) //nessa rota vai ser executado a função assíncrona create

module.exports = sessionsRoutes;