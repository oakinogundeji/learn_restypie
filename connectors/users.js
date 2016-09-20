'use strict';
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
  _ = require('lodash'),
  path = require('path'),
  Restypie = require('restypie'),
  bcrypt = require('bcrypt-nodejs'),
  Promise = require('bluebird'),
  SequelizeConnector = require(path.join(process.cwd(), 'classes/sequelize-connector')),
  User = require(path.join(process.cwd(), 'models'))['user'];
//=============================================================================
/**
 * define UserConnector Class
 */
//=============================================================================
class UserConnector extends SequelizeConnector {

  toPublic() {
    return _.omit(this.toJSON(), ['password', 'masterPassword']);
  }

  /*get shouldValidatePassword() {
    return this.isNew || this.isModified('password');
  }

  get shouldValidateMasterPassword() {
    return this.has('masterPassword', true) && (this.isNew || this.isModified('masterPassword'));
  }

  static isValidMasterPassword(masterPassword, hashedPassword) {
    return this.compareKeys(masterPassword, hashedPassword).then(matches => {
      if (matches) return { isValid: false, reason: `Master password cannot match account password` };
      return { isValid: masterPassword && MASTER_PASSWORD_RE.test(masterPassword) };
    });
  }

  static isValidPassword(password) {
    return Promise.resolve({ isValid: password && PASSWORD_RE.test(password) });
  }*/

  static validPassword (obj, password) {
    return bcrypt.compareSync(password, obj.password);
  };

  static hashPassword (obj, password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }

  /*static hashPassword(password) {
    return this.hashKey(password, PASSWORD_SALT_ROUNDS);
  }

  static hashMasterPassword(masterPassword) {
    return this.hashKey(masterPassword, MASTER_PASSWORD_SALT_ROUNDS);
  }

  static hashKey(str, saltRounds) {
    return new Promise((resolve, reject) => {
      BCrypt.hash(str, saltRounds, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  }

  static validate(object) {
    return Promise.props({
      password: new Promise((resolve, reject) => {
        if (object.shouldValidatePassword) {
          return this.isValidPassword(object.password).then(result => {
            if (!result.isValid) {
              throw new Restypie.RestErrors.BadRequest(result.reason || 'Password does not match requirements.');
            }
            return resolve();
          }).catch(reject);
        }
        return resolve();
      }),

      masterPassword: new Promise((resolve, reject) => {
        if (object.shouldValidateMasterPassword) {
          return object.ensureProperties('password').then(() => {
            return this.isValidMasterPassword(object.masterPassword, object.password).then(result => {
              if (!result.isValid) {
                throw new Restypie.RestErrors.BadRequest(result.reason || 'Master password does not match requirements.');
              }
              return resolve();
            });
          }).catch(reject);
        }
        return resolve();
      })
    });
  }

  static transform(object) {
    return Promise.props({
      password: new Promise((resolve, reject) => {
        if (object.shouldValidatePassword) {
          return this.hashPassword(object.password)
            .then(hash => object.password = hash)
            .then(resolve)
            .catch(reject);
        }
        return resolve();
      }),
      masterPassword: new Promise((resolve, reject) => {
        if (object.shouldValidateMasterPassword) {
          return this.hashMasterPassword(object.masterPassword)
            .then(hash => object.masterPassword = hash)
            .then(resolve)
            .catch(reject);
        }
        return resolve();
      })
    });
  }

  static compareKeys(current, hashed) {
    return new Promise((resolve, reject) => {
      BCrypt.compare(current, hashed, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }*/

  static get model() { return User; }

}
//=============================================================================
/**
 * export module
 */
//=============================================================================
module.exports = UserConnector;
//=============================================================================
