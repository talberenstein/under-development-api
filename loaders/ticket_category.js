const DataLoader = require('dataloader');
const models =  require('../models');


const batchTicketCategory = async (ids,  models ) => {
    const ticket_category = await models.Ticket_category.findAll({
        where: { id: { [models.Sequelize.Op.in]: ids } }

    })

    return ids.map(id => ticket_category.find(ticket_category => ticket_category.id === id))
}

const ticket_categoryLoader = () => new DataLoader(ids => batchTicketCategory( ids, models ))

module.exports = ticket_categoryLoader;