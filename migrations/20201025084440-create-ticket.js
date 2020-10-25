'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultVale: Sequelize.UUIDV4
      },
      id_ticket_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reported: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultVale: false
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false,
        default: 'NO COMENTS'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tickets');
  }
};