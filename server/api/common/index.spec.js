'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var commonCtrlStub = {
  index: 'commonCtrl.index',
  show: 'commonCtrl.show',
  create: 'commonCtrl.create',
  update: 'commonCtrl.update',
  destroy: 'commonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var commonIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './common.controller': commonCtrlStub
});

describe('Common API Router:', function() {

  it('should return an express router instance', function() {
    commonIndex.should.equal(routerStub);
  });

  describe('GET /api/commons', function() {

    it('should route to common.controller.index', function() {
      routerStub.get
        .withArgs('/', 'commonCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/commons/:id', function() {

    it('should route to common.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'commonCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/commons', function() {

    it('should route to common.controller.create', function() {
      routerStub.post
        .withArgs('/', 'commonCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/commons/:id', function() {

    it('should route to common.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'commonCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/commons/:id', function() {

    it('should route to common.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'commonCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/commons/:id', function() {

    it('should route to common.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'commonCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
