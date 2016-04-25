'use strict';

describe('Component: TasksDoneComponent', function () {

  // load the controller's module
  beforeEach(module('tasksAdminApp'));

  var TasksDoneComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TasksDoneComponent = $componentController('TasksDoneComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
