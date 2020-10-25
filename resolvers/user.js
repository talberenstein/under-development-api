const { ApolloError } = require("apollo-server-express")
const jwt = require('jsonwebtoken')


module.exports = {
    Mutation: {
        async signUp(parent, {username, email, password}, { models}){
            const userExists = await models.User.findOne({ where: { email } })

            if(userExists) {
                throw new ApolloError('Email already in use.')
            }

            const user = await models.User.create({ username, email, password})

            const token = jwt.sign({id: user.id, email: user.email, role: user.role}, 
                process.env.JWT_SECRET, 
                {expiresIn: '1h'}
            )

            return {token}
        }
    }
}