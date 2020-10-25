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
    }
  };
  Ticket.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultVale: DataTypes.UUIDV4
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    id_ticket_category: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultVale: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      default: 'NO COMENTS'
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