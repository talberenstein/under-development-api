'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn(
        'Tickets', // table name
        'TicketCategoryId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Tickets',
        'UserId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
