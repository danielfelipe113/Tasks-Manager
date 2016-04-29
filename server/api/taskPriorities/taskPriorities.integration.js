'use strict';

var app = require('../..');
import request from 'supertest';

var newTaskPriorities;

describe('TaskPriorities API:', function() {

  describe('GET /api/taskPrioritiess', function() {
    var taskPrioritiess;

    beforeEach(function(done) {
      request(app)
        .get('/api/taskPrioritiess')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          taskPrioritiess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      taskPrioritiess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/taskPrioritiess', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/taskPrioritiess')
        .send({
          name: 'New TaskPriorities',
          info: 'This is the brand new taskPriorities!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTaskPriorities = res.body;
          done();
        });
    });

    it('should respond with the newly created taskPriorities', function() {
      newTaskPriorities.name.should.equal('New TaskPriorities');
      newTaskPriorities.info.should.equal('This is the brand new taskPriorities!!!');
    });

  });

  describe('GET /api/taskPrioritiess/:id', function() {
    var taskPriorities;

    beforeEach(function(done) {
      request(app)
        .get('/api/taskPrioritiess/' + newTaskPriorities._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          taskPriorities = res.body;
          done();
        });
    });

    afterEach(function() {
      taskPriorities = {};
    });

    it('should respond with the requested taskPriorities', function() {
      taskPriorities.name.should.equal('New TaskPriorities');
      taskPriorities.info.should.equal('This is the brand new taskPriorities!!!');
    });

  });

  describe('PUT /api/taskPrioritiess/:id', function() {
    var updatedTaskPriorities;

    beforeEach(function(done) {
      request(app)
        .put('/api/taskPrioritiess/' + newTaskPriorities._id)
        .send({
          name: 'Updated TaskPriorities',
          info: 'This is the updated taskPriorities!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTaskPriorities = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTaskPriorities = {};
    });

    it('should respond with the updated taskPriorities', function() {
      updatedTaskPriorities.name.should.equal('Updated TaskPriorities');
      updatedTaskPriorities.info.should.equal('This is the updated taskPriorities!!!');
    });

  });

  describe('DELETE /api/taskPrioritiess/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/taskPrioritiess/' + newTaskPriorities._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when taskPriorities does not exist', function(done) {
      request(app)
        .delete('/api/taskPrioritiess/' + newTaskPriorities._id)
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
