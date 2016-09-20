'use strict';
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
  path = require('path'),
  server = require(path.join(process.cwd(), 'server.js')),
  should = require('chai').should(),
  db = require(path.join(process.cwd(), 'models'));
let request = require('supertest');
//=============================================================================
/**
 * setup test dbase connection
 */
//=============================================================================
const test_db_conn = new db.Sequelize('restypie_test', 'root', '');
Object.keys(db.db_conn.models).
  forEach(model => {
    test_db_conn.models[model] = model;
  });
db.test_db_conn = test_db_conn;
//=============================================================================
/**
 * ensure dbase conn is up and models created
 */
//=============================================================================
db.test_db_conn.sync().
  then(() => {
    console.log('Yaaay, test dbase up');
    Object.keys(db.test_db_conn.models).
      forEach(model => {
        console.log(model);
        console.log(' model has been created as table');
      });
  }).
  catch(err => {
    console.log('bummer!');
    console.error(err);
    process.exit(1);
  });
