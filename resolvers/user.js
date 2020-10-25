const { ApolloError, AuthenticationError } = require("apollo-server-express")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils')


module.exports = {
    Mutation: {
        async signUp(parent, {username, email, password}, { models}){
            const userExists = await models.User.findOne({ where: { email } })

            if(userExists) {
                throw new ApolloError('Email already in use.')
            }

            const user = await models.User.create({ username, email, password})

            return { token: generateToken(user) }
        },

        async signIn(parent, { email, password }, { models }) {
            const user = await models.User.findOne({ where: {email}})

            if(!user){
                throw new AuthenticationError('Invalid email or password')
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if(!isPasswordValid){
                throw new AuthenticationError('Invalid email or password')
            }

            return{ token: generateToken(user) }
        }
    }
}