'use strict';
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
  fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  db_conn = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_USER_PWD),
  db = {};
console.log(process.env.DB, process.env.DB_USER, process.env.DB_USER_PWD);
//=============================================================================
/**
 * import models
 */
//=============================================================================
fs.readdirSync(__dirname).
  filter(file => {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  }).
  forEach(model_path => {
    const model = db_conn.import(path.join(__dirname, model_path));
    db[model.name] = model;
  });
//=============================================================================
/**
 * implement associations if any
 */
//=============================================================================
Object.keys(db).forEach(model => {
  if('associate' in db[model]) {
    db[model].associate(db);
  }
});
//=============================================================================
/**
 * map db_conn and sequelize constructor onto db object
 */
//=============================================================================
db.db_conn = db_conn;
db.Sequelize = Sequelize;
//=============================================================================
/**
 * export db object
 */
//=============================================================================
module.exports = db;
//=============================================================================
