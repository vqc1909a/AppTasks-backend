
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
     try{
          const token = req.header('auth-token');
          if(!token) return res.status(401).json({message: "Acceso denegado"});
          const user = jwt.verify(token, process.env.TOKEN_SECRET);
          req.user = user;
          next();
     }catch(err){
          return res.status(404).json({message: "Token inválido"});
     }
}