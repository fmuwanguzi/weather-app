'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('weather', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      temperature: {
        type: Sequelize.FLOAT
      },
      feels_like: {
        type: Sequelize.FLOAT
      },
      min_temp: {
        type: Sequelize.FLOAT
      },
      max_temp: {
        type: Sequelize.FLOAT
      },
      humidity: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('weather');
  }
};