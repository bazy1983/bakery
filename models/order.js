'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Product, {
      foreignKey : {
        allowNull : false
      }
    })
  };
  return Order;
};