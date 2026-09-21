const { Router } = require("express")

const enrutadorPrueba = Router()

enrutadorPrueba.get("/rutaPersonal", (req, res)=>{
    res.json({mensaje: "Ruta de prueba, personal"})
})

//re realizan todas la rutas, con (POST, PUT, DELETE)

module.exports = enrutadorPrueba
