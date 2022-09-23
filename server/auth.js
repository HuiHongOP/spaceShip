const jwt = require('jsonwebtoken')

// authenticates the token 
const authenticateToken = (req,res,next) => {
    // bearer ${token}
    const header = req.headers['authorization'] 
    //console.log(`header: ${header}`)
    // ${token} part only
    const token = header && header.split(' ')[1];
    //console.log(`token: ${token}`)
    if (token == null) {
        return res.status(401).json({error: 'null token' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, result) => {
        if (error) {
            return res.status(403).json({  ewrror:error.message }) 
        }
        next();
    })
}

module.exports = {
    authenticateToken
}