'use strict';

module.exports = (sequelize, DataTypes) => {
  const Prontuario = sequelize.define('Prontuario', {
    doencas: DataTypes.STRING,
    alergias: DataTypes.STRING,
    medicamentos: DataTypes.STRING
  }, {
      freezeTableName: true,
      tableName: 'prontuarios'
  });

  Prontuario.associate = function(models) {
    Prontuario.hasMany(models.Cirurgia, { as: 'cirurgias', foreignKey: 'prontuario_id' })
  };
  
  return Prontuario;
};