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

  // Consulta.associate = function(models) {
  //     Artigo.belongsTo(models.Usuario, { as: 'usuario', foreignKey: 'usuario_id' })
  // };
  
  return Consulta;
};