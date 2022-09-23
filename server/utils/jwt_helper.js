// generate tokens
const jwt = require('jsonwebtoken')

function jwtTokens ({id, username, email}) {
    const user = {id, username, email};
    const access_token = jwt.sign(user,process.env.ACCESS_TOKEN, {expiresIn:"60s"});
    const refresh_token = jwt.sign(user,process.env.REFRESH_TOKEN, {expiresIn:"10m"});
    return ({access_token,refresh_token});
}

module.exports = {
    jwtTokens
}
