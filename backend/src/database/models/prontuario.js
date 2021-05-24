'use strict';

module.exports = (sequelize, DataTypes) => {
  const Prontuario = sequelize.define('Prontuario', {
    paciente: DataTypes.STRING,
    doencas: DataTypes.STRING,
    alergias: DataTypes.STRING,
    medicamentos: DataTypes.STRING
  }, {
      freezeTableName: true,
      tableName: 'prontuarios'
  });
  
  return Prontuario;
};