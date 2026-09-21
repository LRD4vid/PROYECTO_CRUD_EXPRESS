require ("dotenv").config()
const express = require("express")
//debemos importar los enrutadores de la carpeta routers
const enrutadorGeneral = require("./routers")

const app = express()

//importar los middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//usamos el enrutador general
app.use("/api", enrutadorGeneral)

//endpoint 
app.get("/", (req, res) => {
    res.send("API R est 3407182 en funcionamiento")
})

module.exports = app
