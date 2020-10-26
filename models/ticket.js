//Since I want to generate QR should I install a pkg, refering to its in the Model Ticket

'use strict';

const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User, {foreignKey: 'userid'})
      Ticket.belongsTo(models.Ticket_category, {foreignKey: 'id_ticket_category'})
      Ticket.belongsTo(models.Event, {foreignKey: 'Eventid'})
    }
  };
  Ticket.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userid: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    id_ticket_category: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    eventid:{
      type: DataTypes.UUID,
      allowNull: false,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'NO COMENTS'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};