'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    await queryInterface.createTable('prontuarios', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      paciente: {
        allowNull: false,
        type: Sequelize.STRING
      },

      doencas: {
        allowNull: true,
        type: Sequelize.STRING
      },

      alergias: {
        allowNull: true,
        type: Sequelize.STRING
      },

      medicamentos:{
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('prontuarios');    
  }
};
