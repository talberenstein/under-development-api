
module.exports = {
    Query: {
        allEvents ( parent, args , {models} ) {
            return models.Event.findAll()
        }
    }
}