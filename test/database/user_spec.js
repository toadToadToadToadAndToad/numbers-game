'use strict';

import r from 'rethinkdb';
import chai from 'chai';
import User from '../../database/models/user';
import Job from '../../database/models/job';
import thinky from '../../database/thinkylocal.js';
import userController from '../../server/controllers/user';
let request = require('request');
let expect = chai.expect;

describe('User Controller Methods Testing', () => {
  let connection = null;
  beforeEach((done) => {
    r.connect({ host: 'localhost', port: 28015, db: 'test' }, (err, conn) => {
      if (err) throw err;
      connection = conn;
    });
    done();
  });

  afterEach(() => {
    r.dbDrop('test');
  });

  it('Should add a new user to the database', (done) => {
    request({ method: 'POST',
              url: 'http://localhost:3000/api/users',
              json: { username: 'melissa', email: 'ing@melissa.com', password: 'ex' },
    }, () => {
      let promise = r.db('test').table('User').run(connection, (err, user) => {
        if (err) throw err;
        expect(user).to.equal({ username: 'melissa', email: 'ing@melissa.com', password: 'ex' });
      }
      );
      done();
    });
  });

  // it('Should NOT add an existing user to the database', (done) => {
  //   request({ method: "POST",
  //             url: "http://localhost:3000/api/users",
  //             json: {"username": "melissa", "email": "ing@melissa.com", "password": "exy"}
  //   }, () => { 
  //     request({ method: "POST",
  //             url: "http://localhost:3000/api/users",
  //             json: {"username": "melissa", "email": "ing@melissa.com", "password": "exy"}
  //   }, () => {
  //     let user = r.db('test').table('User').count();
  //     expect(user).to.equal(1);
  //     done();
  //      });
  //   });
  // });

  // it('Should delete a user from the database', (done) => {
  //   request({ method: "POST",
  //             url: "http://localhost:3000/api/users",
  //             json: {"username": "melissa", "email": "ing@melissa.com", "password": "exy"}
  //   }, () => { 
  //     request({ method: "DELETE",
  //             url: "http://localhost:3000/api/users",
  //             json: {"username": "melissa", "email": "ing@melissa.com", "password": "exy"}
  //   }, () => {
  //     let user = r.db('test').table('User').count();
  //     expect(user).to.equal(0);
  //     done();
  //   });
  // });
});