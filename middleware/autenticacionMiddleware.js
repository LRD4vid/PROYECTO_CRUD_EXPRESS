const jwtoken = require("jsonwebtoken")

const autenticacionMiddleware = (req, res, next) => {
    const token =req.header("campoAutenticar")?.split(" ")[1]
    if(!token){
       return res.status(401).json({Mensaje: "Acceso denegado, no tiene token"})
    }
    //verificar el token
    jwtoken.verify(token,process.env.JWT_SECRETO, (error, usuario)=>{
        if(error){
            res.status(403).json({Mensaje: "Token invalido"})
        }
        req.usuario = usuario
        next()
    })
}
module.exports = autenticacionMiddlewaregi