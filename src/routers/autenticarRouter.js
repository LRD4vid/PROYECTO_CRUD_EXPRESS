const { Router } = require("express")

const enrutadorAuth = Router()

//Ruta de registro en el sistema
enrutadorAuth.post("/registro", (req, res)=>{
    res.json({mensaje: "Ruta de registro"})
})

//Ruta de inicio de sesion
enrutadorAuth.post("/login", (req, res)=>{
    res.json({mensaje: "Ruta de Inicio de Sesion"})
})

//re realizan todas la rutas, con (POST, PUT, DELETE)
module.exports = enrutadorAuth
