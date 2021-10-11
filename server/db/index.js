const Sequelize = require('sequelize');
const db = require('./database');
const Store = require('./Store');
const Type = require('./Type');

const Store_Type = db.define('store_types', {}, { timestamps: false });
Type.belongsToMany(Store, { through: Store_Type });
Store.belongsToMany(Type, { through: Store_Type });

module.exports = {
  db,
  Store,
  Type,
  Store_Type,
};
