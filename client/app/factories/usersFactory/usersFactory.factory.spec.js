'use strict';

describe('Service: tasksFactory', function () {

  // load the service's module
  beforeEach(module('tasksAdminApp.usersFactory'));

  // instantiate service
  var tasksFactory;
  beforeEach(inject(function (_tasksFactory_) {
    tasksFactory = _tasksFactory_;
  }));

  it('should do something', function () {
    expect(!!tasksFactory).toBe(true);
  });

});
