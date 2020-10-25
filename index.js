const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const models = require('./models')

const app = express()
const port = 4000

const typeDefs = gql`
    type Query {
        sayHello: String
    }
`
const resolvers = {
    Query: {
        sayHello(){
            return 'Hello Evelina you bought one ticket1!'
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: { models }
})

server.applyMiddleware({ app, cors: true})

app.listen({port}, () => console.log(`Server ready at hhtp://localhost:${port}${server.graphqlPath}`))