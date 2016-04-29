'use strict';

var app = require('../..');
import request from 'supertest';

var newCommon;

describe('Common API:', function() {

  describe('GET /api/commons', function() {
    var commons;

    beforeEach(function(done) {
      request(app)
        .get('/api/commons')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          commons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      commons.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/commons', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/commons')
        .send({
          name: 'New Common',
          info: 'This is the brand new common!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCommon = res.body;
          done();
        });
    });

    it('should respond with the newly created common', function() {
      newCommon.name.should.equal('New Common');
      newCommon.info.should.equal('This is the brand new common!!!');
    });

  });

  describe('GET /api/commons/:id', function() {
    var common;

    beforeEach(function(done) {
      request(app)
        .get('/api/commons/' + newCommon._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          common = res.body;
          done();
        });
    });

    afterEach(function() {
      common = {};
    });

    it('should respond with the requested common', function() {
      common.name.should.equal('New Common');
      common.info.should.equal('This is the brand new common!!!');
    });

  });

  describe('PUT /api/commons/:id', function() {
    var updatedCommon;

    beforeEach(function(done) {
      request(app)
        .put('/api/commons/' + newCommon._id)
        .send({
          name: 'Updated Common',
          info: 'This is the updated common!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCommon = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCommon = {};
    });

    it('should respond with the updated common', function() {
      updatedCommon.name.should.equal('Updated Common');
      updatedCommon.info.should.equal('This is the updated common!!!');
    });

  });

  describe('DELETE /api/commons/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/commons/' + newCommon._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when common does not exist', function(done) {
      request(app)
        .delete('/api/commons/' + newCommon._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
