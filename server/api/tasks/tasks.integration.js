'use strict';

var app = require('../..');
import request from 'supertest';

var newTasks;

describe('Tasks API:', function() {

  describe('GET /api/tasks', function() {
    var taskss;

    beforeEach(function(done) {
      request(app)
        .get('/api/tasks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          taskss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      taskss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tasks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tasks')
        .send({
          name: 'New Tasks',
          info: 'This is the brand new tasks!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTasks = res.body;
          done();
        });
    });

    it('should respond with the newly created tasks', function() {
      newTasks.name.should.equal('New Tasks');
      newTasks.info.should.equal('This is the brand new tasks!!!');
    });

  });

  describe('GET /api/tasks/:id', function() {
    var tasks;

    beforeEach(function(done) {
      request(app)
        .get('/api/tasks/' + newTasks._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tasks = res.body;
          done();
        });
    });

    afterEach(function() {
      tasks = {};
    });

    it('should respond with the requested tasks', function() {
      tasks.name.should.equal('New Tasks');
      tasks.info.should.equal('This is the brand new tasks!!!');
    });

  });

  describe('PUT /api/tasks/:id', function() {
    var updatedTasks;

    beforeEach(function(done) {
      request(app)
        .put('/api/tasks/' + newTasks._id)
        .send({
          name: 'Updated Tasks',
          info: 'This is the updated tasks!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTasks = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTasks = {};
    });

    it('should respond with the updated tasks', function() {
      updatedTasks.name.should.equal('Updated Tasks');
      updatedTasks.info.should.equal('This is the updated tasks!!!');
    });

  });

  describe('DELETE /api/tasks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tasks/' + newTasks._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tasks does not exist', function(done) {
      request(app)
        .delete('/api/tasks/' + newTasks._id)
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
