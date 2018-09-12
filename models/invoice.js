'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('Invoice', {
    number: DataTypes.STRING,
    total: DataTypes.FLOAT,
    tax : DataTypes.FLOAT,
    grandTotal: DataTypes.FLOAT,
    paid: DataTypes.BOOLEAN
  }, {});
  Invoice.associate = function(models) {
    // associations can be defined here
    Invoice.belongsTo(models.Business, {
      foreignKey : {
        allowNull : false
      }
    });
    Invoice.hasMany(models.Order,{
      onDelete : "cascade"
    })
  };
  return Invoice;
};