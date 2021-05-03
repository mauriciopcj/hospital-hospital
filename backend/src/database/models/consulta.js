'use strict';

module.exports = (sequelize, DataTypes) => {
  const Consulta = sequelize.define('Consulta', {
    data: DataTypes.DATE,
    local: DataTypes.STRING,
    observacoes: DataTypes.STRING,
    medico: DataTypes.INTEGER,
    paciente: DataTypes.INTEGER
  }, {
      freezeTableName: true,
      tableName: 'consultas'
  });

  Consulta.associate = function(models) {
    Consulta.hasMany(models.Receita, { as: 'receitas', foreignKey: 'consulta_id' })
  };
  
  return Consulta;
};