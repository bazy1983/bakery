'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('Invoice', {
    number: DataTypes.STRING
  }, {});
  Invoice.associate = function(models) {
    // associations can be defined here
    Invoice.belongsTo(models.Business, {
      foreignKey : {
        allowNull : false
      }
    })
  };
  return Invoice;
};