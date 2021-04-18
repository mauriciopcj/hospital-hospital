'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('consultas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      data: {
        allowNull: false,
        type: Sequelize.DATE
      },

      local: {
        allowNull: false,
        type: Sequelize.STRING
      },

      observacoes: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      medico: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      paciente: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      created_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('consultas');
  }
};