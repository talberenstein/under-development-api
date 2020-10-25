const { gql } = require('apollo-server-express')


module.exports = gql`
    type Ticket_category {
        id: ID!
        name: String!
        description: Text!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`
