const { gql } = require('apollo-server-express')


module.exports = gql`
    type Ticket {
        id: ID!
        userid: ID!
        id_ticket_category: ID!
        reported: Boolean!
        details: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    extend type Mutation {
        createTicket(id_ticket_category: ID!): Ticket!
    }
`
