// generate tokens
const jwt = require('jsonwebtoken')

function jwtTokens ({id,username,email,isadmin}) {
    const user = {id,username,email,isadmin};
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn:"3d"});
    const refresh_token = jwt.sign(user,process.env.REFRESH_TOKEN, {expiresIn:"14d"});
    return ({access_token,refresh_token});
}

module.exports = {
    jwtTokens
}
