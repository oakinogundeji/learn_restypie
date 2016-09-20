'use strict';
//=============================================================================
/**
 * define model and export object
 */
//=============================================================================
module.exports = ((db_conn, dataTypes) => {
  const User = db_conn.define('user', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: dataTypes.STRING,
      allowNull: false
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    lastname: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
  return User;
});
//=============================================================================
