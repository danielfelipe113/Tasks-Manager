'use strict';

describe('Component: TasksToDoComponent', function () {

  // load the controller's module
  beforeEach(module('tasksAdminApp'));

  var TasksToDoComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TasksToDoComponent = $componentController('TasksToDoComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
