const jwt = require('jsonwebtoken');

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
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
        if (error) {
            return res.status(403).json({error:error.message }) 
        }
        // assign user payload to req
        req.user = user
        next();
    })
}

// for product and order, only admin can add products
const verifyTokenAndAdmin = (req,res,next) => {
    authenticateToken(req,res, () => {
        console.log(req.user.isadmin)
        if (req.user.id === req.params.id || req.user.isadmin) {
            next();
        }
        else {
            res.status(403).json('You are not allowed to do that');
        }
    });
}

module.exports = {
    authenticateToken,
    verifyTokenAndAdmin
}