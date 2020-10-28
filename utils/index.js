const jwt = require('jsonwebtoken')

const generateToken = user => {
    return jwt.sign({id: user.id, email: user.email, role: user.role}, 
        process.env.JWT_SECRET, 
        {expiresIn: '1h'}
    )
}

//Split Bearer Token
const getAuthUser = req => {
    //Authorization Bearer tokensdjkfadsflksadfjaslöfkajdlö
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]

    if( !token ){
        return null
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}

const encodeCursor = cursor => Buffer.from(cursor).toString("base64");

const decodeCursor = cursor => Buffer.from(cursor, "base64").toString('ascii')

module.exports = { generateToken, getAuthUser, encodeCursor, decodeCursor }