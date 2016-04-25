'use strict';

describe('Component: TasksToDoTodayComponent', function () {

  // load the controller's module
  beforeEach(module('tasksAdminApp'));

  var TasksToDoTodayComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TasksToDoTodayComponent = $componentController('TasksToDoTodayComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
