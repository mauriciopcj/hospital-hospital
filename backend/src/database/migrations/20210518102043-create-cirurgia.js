'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cirurgias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },

      descricao: {
        type: Sequelize.STRING
      },

      data_entrada: {
        allowNull: false,
        type: Sequelize.DATE
      },

      data_saida: {
        allowNull: false,
        type: Sequelize.DATE
      },

      prontuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'prontuarios',
          key: 'id'
        }
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
    await queryInterface.dropTable('cirurgias');
  }
};