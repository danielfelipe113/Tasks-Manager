'use strict';

describe('Component: TasksDelayedComponent', function () {

  // load the controller's module
  beforeEach(module('tasksAdminApp'));

  var TasksDelayedComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TasksDelayedComponent = $componentController('TasksDelayedComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
