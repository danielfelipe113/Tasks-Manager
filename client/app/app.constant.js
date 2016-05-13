(function(angular, undefined) {
  angular.module("tasksAdminApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"Employee",
		"Supervisor",
		"Administrator"
	],
	"userRolesJson": {
		"Employee": "Employee",
		"Administrator": "Administrator",
		"Supervisor": "Supervisor"
	},
	"tasksStatus": {
		"InProgress": "InProgress",
		"ToDoToday": "ToDoToday",
		"ToDo": "ToDo",
		"Delayed": "Delayed",
		"Done": "Done"
	}
})

;
})(angular);