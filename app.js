require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.MIPUERTO || 3003;

//librerias fs, path
const sistemaArchivo = require("fs");
const ruta = require("path");
const rutaMiArchivo = ruta.join(__dirname,"datos.json")

//importar multer
const multer = require("multer")
//Almacenamiento
const almacen = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "misImagenes/")}, 
  filename: (req, file, cb) => {
    const extension = ruta.extname(file.originalname)
    cb(null, `${Date.now()} ${extension}`)}
})

const subir = multer({storage:almacen})

//importar validaciones
const { validarAprendiz, validarId } = require("./Validaciones/validaciones")

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


app.post('/api/aprendices', subir.single("imagen"),(req, res) => {
  const datosAprendiz = req.body
  datosAprendiz.imagen = req.file ? `/misImagenes/${req.file.filename}` : "Sin imagen"

  //validaciones de nombre, correo y edad
  const errores = validarAprendiz(datosAprendiz)
  if (errores.length > 0) {
    return res.status(400).json({ Errores: errores })
  }

  sistemaArchivo.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
    if (error) {
      return res.status(500).json({ Error: "No se puede acceder o leer los datos"})};
    const listaAprendices = JSON.parse(datos)

    //genera el id autoincremental para el nuevo aprendiz
    const nuevoId = listaAprendices.length > 0
      ? Math.max(...listaAprendices.map(aprendiz => Number(aprendiz.id) || 0)) + 1
      : 1
    datosAprendiz.id = nuevoId

    listaAprendices.push(datosAprendiz)
    sistemaArchivo.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
      return res.status(500).json({ Error: "No se pueden crear o escribir los datos"})};
    res.status(201).json ({
      "Mensaje": "Creado", Datos: datosAprendiz
    })
  })
})});


app.put('/api/aprendices/:id', subir.single("imagen"), (req, res) => {
  const { id } = req.params

  //valida que el id venga correcto
  const idValido = validarId(id)
  if (!idValido.valido) {
    return res.status(400).json({ Error: idValido.mensaje })
  }

  const datosActualizados = req.body

  //validaciones de nombre, correo y edad
  const errores = validarAprendiz(datosActualizados)
  if (errores.length > 0) {
    return res.status(400).json({ Errores: errores })
  }

  sistemaArchivo.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
    if (error) {
      return res.status(500).json({ Error: "No se puede acceder o leer los datos"})};

    const listaAprendices = JSON.parse(datos)
    const indice = listaAprendices.findIndex(aprendiz => Number(aprendiz.id) === Number(id))

    if (indice === -1) {
      return res.status(404).json({ Error: "No se encontro un aprendiz con ese id"})
    }

    const aprendizExistente = listaAprendices[indice]

    //si llega una imagen nueva se reemplaza y se borra la anterior, si no se conserva la que ya tenia
    if (req.file) {
      datosActualizados.imagen = `/misImagenes/${req.file.filename}`
      if (aprendizExistente.imagen && aprendizExistente.imagen !== "Sin imagen") {
        const rutaImagenAnterior = ruta.join(__dirname, aprendizExistente.imagen)
        sistemaArchivo.unlink(rutaImagenAnterior, () => {})
      }
    } else {
      datosActualizados.imagen = aprendizExistente.imagen
    }

    listaAprendices[indice] = { ...aprendizExistente, ...datosActualizados, id: aprendizExistente.id }

    sistemaArchivo.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
        return res.status(500).json({ Error: "No se pueden actualizar los datos"})};
      res.status(200).json({
        Mensaje: "Actualizado", Datos: listaAprendices[indice]
      })
    })
  })
})


app.delete('/api/aprendices/:id', (req, res) => {
  const { id } = req.params

  //valida que el id venga correcto
  const idValido = validarId(id)
  if (!idValido.valido) {
    return res.status(400).json({ Error: idValido.mensaje })
  }

  sistemaArchivo.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
    if (error) {
      return res.status(500).json({ Error: "No se puede acceder o leer los datos"})};

    const listaAprendices = JSON.parse(datos)
    const indice = listaAprendices.findIndex(aprendiz => Number(aprendiz.id) === Number(id))

    if (indice === -1) {
      return res.status(404).json({ Error: "No se encontro un aprendiz con ese id"})
    }

    const [aprendizEliminado] = listaAprendices.splice(indice, 1)

    //borra la imagen asociada al aprendiz eliminado, si tenia una
    if (aprendizEliminado.imagen && aprendizEliminado.imagen !== "Sin imagen") {
      const rutaImagen = ruta.join(__dirname, aprendizEliminado.imagen)
      sistemaArchivo.unlink(rutaImagen, () => {})
    }

    sistemaArchivo.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
        return res.status(500).json({ Error: "No se pueden eliminar los datos"})};
      res.status(200).json({
        Mensaje: "Eliminado", Datos: aprendizEliminado
      })
    })
  })
})



app.listen(PORT, () => {
  console.log(`Servidor online en el puerto: http://localhost:${PORT}`);
});