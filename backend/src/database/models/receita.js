'use strict';

module.exports = (sequelize, DataTypes) => {
  const Receita = sequelize.define('Receita', {
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    consulta_id: DataTypes.INTEGER,
  }, {
      freezeTableName: true,
      tableName: 'receitas'
  });

  Receita.associate = function(models) {
    Receita.belongsTo(models.Consulta, { as: 'consulta', foreignKey: 'consulta_id' })
  };
  
  return Receita;
};