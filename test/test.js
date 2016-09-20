'use strict';
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
  path = require('path'),
  server = require(path.join(process.cwd(), 'server.js')),
  should = require('chai').should();
let request = require('supertest');
//=============================================================================
/**
 * module config
 */
//=============================================================================
request = request(server);
//=============================================================================
/**
 * tests
 */
//=============================================================================
describe('basic app health test', function () {
  this.timeout(5000);
  it('should respond with 200 and JSON string with value "TEST"', function (done) {
    request.
      get('/test').
      expect(200).
      end(function (err, res) {
        if(err) {
          done(err);
        }
        console.log(res);
        res.body.should.equal('TEST!');
        done();
      });
  });
});
//=============================================================================
