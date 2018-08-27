'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tax = sequelize.define('Tax', {
    rate: DataTypes.FLOAT
  }, {});
  Tax.associate = function(models) {
    // associations can be defined here
  };
  return Tax;
};