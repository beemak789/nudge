const Sequelize = require('sequelize');
const db = require('./database');

const Store = db.define('store', {
  place_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  business_status: {
    type: Sequelize.ENUM('OPERATIONAL', 'CLOSED_TEMPORARILY'),
    allowNull: false,
  },
  latitude: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
  },
  geo: {
    type: Sequelize.GEOMETRY('POINT'),
  },
});

module.exports = Store;
