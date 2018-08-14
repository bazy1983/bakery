'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      unique: true
    },
    price: {
      type: DataTypes.FLOAT,
    allowNull: false
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Order, {
      onDelete : "cascade"
    })
  };
  return Product;
};