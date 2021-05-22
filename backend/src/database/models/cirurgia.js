'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cirurgia = sequelize.define('Cirurgia', {
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_entrada: DataTypes.DATE,
    data_saida: DataTypes.DATE,
    prontuario_id: DataTypes.INTEGER,
  }, {
      freezeTableName: true,
      tableName: 'cirurgias'
  });

  Cirurgia.associate = function(models) {
    Cirurgia.belongsTo(models.Prontuario, { as: 'prontuario', foreignKey: 'prontuario_id' })
  };
  
  return Cirurgia;
};