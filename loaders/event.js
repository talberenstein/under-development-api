const DataLoader = require('dataloader');
const models =  require('../models');


const batchEvent = async (ids,  models ) => {
    console.log("ids:!!!" + ids)
    const events = await models.Event.findAll({
        where: { id: { [models.Sequelize.Op.in]: ids } }

    })

    return ids.map(id => events.find(event => event.id === id))
}


const eventLoader = () => new DataLoader(ids => batchEvent( ids, models ))

module.exports = eventLoader;