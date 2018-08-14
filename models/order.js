'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    invoice: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Business, {
      foreignKey : {
        allowNull : false
      }
    }),
    Order.belongsTo(models.Product, {
      foreignKey : {
        allowNull : false
      }
    })
  };
  return Order;
};