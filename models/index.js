const {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect: _dialect,
  pool: _pool
} = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  operatorsAliases: false,

  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./mdTest.model.js")(sequelize, Sequelize);

module.exports = db;
