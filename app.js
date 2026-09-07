require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.MIPUERTO || 3003;

//librerias fs, path
const sistemaArchivo = require("fs");
const ruta = require("path");
const rutaMiArchivo = ruta.join(__dirname,"datos.json")

//middelware body-parse
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('API Rest Full con Express');
});


app.get('/api/aprendices', (req, res) => {
  sistemaArchivo.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
    if (error) {
      return res.status(500).json({ Error: "No se puede acceder o leer los datos"})};
    const listaAprendices = JSON.parse(datos)
    res.status(200).json ({
      listado: listaAprendices
    })
  })
  // res.status(200).json({/*'Mensaje': 'Lista Aprendices'*/})
});


app.post('/api/aprendices', (req, res) => {
  const datosAprendiz = req.body

  sistemaArchivo.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
    if (error) {
      return res.status(500).json({ Error: "No se puede acceder o leer los datos"})};
    const listaAprendices = JSON.parse(datos)
    listaAprendices.push(datosAprendiz)
    sistemaArchivo.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
      return res.status(500).json({ Error: "No se pueden crear o escribir los datos"})};
    res.status(200).json ({
      "Mensaje": "Creado", Datos: datosAprendiz
    })
  })
  // const edad = req.body.edad
  // const datosAprendiz = req.body
  // if (edad >= 18) {
  //   return res.status(201).json({'Mensaje': 'Eres mayor de Edad','Datos': datosAprendiz})}
  //   res.status(201).json({'Mensaje': 'Eres menor de Edad', 'Datos': datosAprendiz})
//  res.status(201).json({'Mensaje': 'Crear Aprendiz', 'Datos': datosAprendiz,})
})});


app.put('/api/aprendices/:id', (req, res) => {
  res.status(200).json({'Mensaje': 'Actualiza Aprendiz'})
})


app.delete('/api/aprendices/:id', (req, res) => {
  res.status(200).json({'Mensaje': 'Eliminado'})
})



app.listen(PORT, () => {
  console.log(`Servidor online en el puerto: http://localhost:${PORT}`);
});