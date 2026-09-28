//consolida o agrupa todos los enrutadores
const { Router } = require("express")
const enrutadorGeneral = Router()
const enrutadorPrueba = require("./pruebaRouter")
//importar enrutadorAuth
const enrutadorAuth = require("./autenticarRouter")

enrutadorGeneral.use("/rutaprueba", enrutadorPrueba)
enrutadorGeneral.use("/autenticar", enrutadorAuth)

module.exports = enrutadorGeneral


