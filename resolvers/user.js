const { ApolloError, AuthenticationError } = require("apollo-server-express")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils')
const user = require("../typeDefs/user")
const cloudinary = require('cloudinary').v2
const { encodeCursor, decodeCursor } = require('../utils') 



module.exports = {

    Query: {
        me(parent, args, { models, authUser }) {
            return models.User.findByPk(authUser.id)
        },

        async user(parent, { username }, { models}){
            const user = await models.User.findOne({ where: { username } })

            if(!user){
                throw new ApolloError("No user found")
            }
            
            return user

        }
    },

    Mutation: {

        // SIGN UP. Token generate in utils/index.js
        async signUp(parent, {username, email, password}, { models}){
            const userExists = await models.User.findOne({ where: { email } })

            if(userExists) {
                throw new ApolloError('Email already in use.')
            }

            const user = await models.User.create({ username, email, password})

            return { token: generateToken(user) }
        },

        // SIGN IN. Token generate in utils/index.js
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
        },

        async uploadAvatar( parent, { avatar }, { models, authUser }){
            const { createReadStream } = await avatar

            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET
            })

            try {
                const result = await new Promise((resolve, reject) => {
                    createReadStream().pipe(cloudinary.uploader.upload_stream(( error, result) => {
                        if(error){
                            reject(error);
                        }
    
                        resolve(result);
                    })
                );
                })

                const user = await models.User.findByPk(authUser.id)
                await user.update({ avatar: result.secure_url });

                return user

            } catch (error) {
                throw new ApolloError('There was a problem uploading your avatar')
            }
        }
    },

    User: {
        async tickets(user, { perPage = 15, after }, { models}){
            const whereOptions = {
                userId: user.id
            }

            if(after){
                whereOptions.createdAt = {
                    [models.Sequelize.Op.gt]: decodeCursor(after)
                }
            }

            const {rows, count} = await models.Ticket.findAndCountAll({
                order: [["createdAt", "ASC"]],
                limit: perPage,
                where: whereOptions
            })

            return {
                edges: rows,
                pageInfo: {
                    endCursor: rows.length 
                    ? encodeCursor(rows[rows.length -1].createdAt.toISOString())
                    : null,
                    hasMore: rows.length ? count > rows.length : false,
                }
            }
        }
    }

}