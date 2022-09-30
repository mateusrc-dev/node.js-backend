//esse arquivo vai ter a missão de reunir todas as rotas da aplicação

const { Router } = require("express")

const usersRouter = require("./users.routes")

const routes = Router()

routes.use("/users", usersRouter) //toda vez que alguém for acessar a rota '/users' vai ser redirecionado para o usersRouter

module.exports = routes;//para exportar usamos module.exports - esse routes contém todas as rotas da nossa aplicação