const { gql } = require('apollo-server-express')


module.exports = gql`
    type Ticket {
        id: ID!
        user_id: ID!
        id_ticket_category: ID!
        role: Role!
        reported: Boolean!
        details: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`
