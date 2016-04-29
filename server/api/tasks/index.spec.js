'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tasksCtrlStub = {
  index: 'tasksCtrl.index',
  show: 'tasksCtrl.show',
  create: 'tasksCtrl.create',
  update: 'tasksCtrl.update',
  destroy: 'tasksCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tasksIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tasks.controller': tasksCtrlStub
});

describe('Tasks API Router:', function() {

  it('should return an express router instance', function() {
    tasksIndex.should.equal(routerStub);
  });

  describe('GET /api/tasks', function() {

    it('should route to tasks.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tasksCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tasks/:id', function() {

    it('should route to tasks.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tasksCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tasks', function() {

    it('should route to tasks.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tasksCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tasks/:id', function() {

    it('should route to tasks.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tasksCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tasks/:id', function() {

    it('should route to tasks.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tasksCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tasks/:id', function() {

    it('should route to tasks.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tasksCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
