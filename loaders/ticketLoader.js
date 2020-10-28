const DataLoader = require('dataloader');
const models =  require('../models');
const groupBy = require("lodash.groupby")


const batchTicket = async (ids,  models ) => {
    const ticket = await models.Ticket.findAll({
        order: [["createdAt", "ASC"]],
        where: { userid: { [models.Sequelize.Op.in]: ids } }
    })


    const groupByUserId = groupBy(ticket, "userid")

    return ids.map(id => groupByUserId[id] || [] );
    //return ids.map(id => ticket.find(tickets => ticket.id === id))
}


const ticketLoader = () => new DataLoader(ids => batchTicket( ids, models ))

module.exports = ticketLoader;