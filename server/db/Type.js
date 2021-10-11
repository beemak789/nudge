const Sequelize = require('sequelize');
const db = require('./database');

const Type = db.define('type', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Type;
