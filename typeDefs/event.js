const { gql } = require('apollo-server-express')


module.exports = gql`
    type Event {
        id: ID!
        name: String!
        author: User!
        description: String!
        canceled: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    extend type Query {
        allEvents: [Event!]!
    }

    extend type Mutation {
        createEvent(name: String!, description: String, canceled: Boolean): Event!
    }
`
