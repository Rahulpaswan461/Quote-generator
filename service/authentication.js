const JWT = require("jsonwebtoken")
const secret = "rahul@1234"

function createTokenForAuthenticatedUser(user){
    const payload = {
        id:user._id,
        name:user.name,
        email:user.email
    }

    return JWT.sign(payload,secret,{expiresIn:'2h'})
}

function verifyToken(token){
    if(!token){
        throw new Error("Token is required")
    }

    return JWT.verify(token,secret)
}

module.exports = {
    createTokenForAuthenticatedUser,
    verifyToken
}
