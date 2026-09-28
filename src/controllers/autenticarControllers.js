const iniciarSesion = async (req, res) =>{

    //simular bd de un usuario registrado 
    const userBd = {"usuario": "leider", "clave":"123"}
    try {
        const {usuario, clave} =req.body
        //comparar con userBD
        if(userBd.usuario !== usuario || userBd.clave !== clave){
            res.json({mensaje: "Credenciales incorrectas"})
        }
        res.json({mensaje: "Usuario Bienvenido"})
    } catch (error) {
        res.json({Error: error})
    }
}

const registrarse = async (req, res)=> {
    try{
        const datos = req.body
        res.json({datosRegistro: datos})
    } catch (error) {
        res.json({Error: error})
    }

}

module.exports = {iniciarSesion, registrarse}