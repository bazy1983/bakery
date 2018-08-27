'use strict';
module.exports = (sequelize, DataTypes) => {
  var Business = sequelize.define('Business', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city : DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
    Business.hasMany(models.Invoice, {
      onDelete : "cascade"
    })
  };
  return Business;
};