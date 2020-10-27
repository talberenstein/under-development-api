const { SchemaDirectiveVisitor, AuthenticationError, ApolloError } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class AdminDirective extends SchemaDirectiveVisitor{
    visitFieldDefinition(field){
        const { resolve = defaultFieldResolver} = field

        field.resolve = function(...args) {
            const { authUser } = args[2]

            if(!authUser){
                throw new AuthenticationError("You are not authenticated.")
            }

            if(authUser.role !== 'ADMIN'){
                throw new ApolloError("You are not an admin")
            }

            return resolve.apply(this, args)
        }
    }
}

module.exports = AdminDirective