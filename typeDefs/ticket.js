const { gql } = require('apollo-server-express')


module.exports = gql`
    type Ticket {
        id: ID!
        owner: User!
        ticket_category: Ticket_category!
        reported: Boolean!
        details: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    extend type Mutation {
        createTicket(details: String, id_ticket_category: ID!): Ticket!
    }

    extend type Query {
        ticket(id: ID!): Ticket!
        allTickets: [Ticket!]!
    }
`
