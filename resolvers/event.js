
module.exports = {
    Query: {
        allEvents ( parent, args , {models} ) {
            return models.Event.findAll()
        }
    },

    Mutation: {
        createEvent ( parent, args, { models, authUser }){
            return models.Event.create({
                ...args,
                userid: authUser.id,
            })
        },
    },
}