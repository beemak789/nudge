const chalk = require('chalk');
const sequelize = require('sequelize');
const pkg = require('../../package.json');

const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;
console.log(chalk.yellow(`Opening database connection to ${dbName}`));

const db = new sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

module.exports = db;
