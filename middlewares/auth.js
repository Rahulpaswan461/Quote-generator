const { verifyToken } = require("../service/authentication");

function checkForAuthenticatedUser(cookie){
    return (req,res,next) =>{
        if(req.path === "/api/user/signup" || req.path === "/api/user/login" || req.path=== "/"){
            return next();
        }
        const token = req.cookies[cookie]
        if(!token){
            return res.status(401).json({Error:" Authentication is required !!!"})
        }

        try{
          const payload = verifyToken(token)
          res.user = payload

          return next();
        }
        catch(error){
            console.log("Authentication is requrired token is invalid !!",error.message)
            return next()
        }
    }
}

module.exports = {
    checkForAuthenticatedUser
}