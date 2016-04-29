'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var taskPrioritiesCtrlStub = {
  index: 'taskPrioritiesCtrl.index',
  show: 'taskPrioritiesCtrl.show',
  create: 'taskPrioritiesCtrl.create',
  update: 'taskPrioritiesCtrl.update',
  destroy: 'taskPrioritiesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var taskPrioritiesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './taskPriorities.controller': taskPrioritiesCtrlStub
});

describe('TaskPriorities API Router:', function() {

  it('should return an express router instance', function() {
    taskPrioritiesIndex.should.equal(routerStub);
  });

  describe('GET /api/taskPrioritiess', function() {

    it('should route to taskPriorities.controller.index', function() {
      routerStub.get
        .withArgs('/', 'taskPrioritiesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/taskPrioritiess/:id', function() {

    it('should route to taskPriorities.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'taskPrioritiesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/taskPrioritiess', function() {

    it('should route to taskPriorities.controller.create', function() {
      routerStub.post
        .withArgs('/', 'taskPrioritiesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/taskPrioritiess/:id', function() {

    it('should route to taskPriorities.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'taskPrioritiesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/taskPrioritiess/:id', function() {

    it('should route to taskPriorities.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'taskPrioritiesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/taskPrioritiess/:id', function() {

    it('should route to taskPriorities.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'taskPrioritiesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
