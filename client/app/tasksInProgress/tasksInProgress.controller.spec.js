'use strict';

describe('Component: TasksInProgressComponent', function () {

  // load the controller's module
  beforeEach(module('tasksAdminApp'));

  var TasksInProgressComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TasksInProgressComponent = $componentController('TasksInProgressComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
