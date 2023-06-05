const jwt = require("jsonwebtoken")

function getTokenInfo (token) {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data
}

module.exports = getTokenInfo