
module.exports = {
    Query: {
        allTicketCategories ( parent, args , {models} ) {
            return models.Ticket_category.findAll()
        }
    }
}