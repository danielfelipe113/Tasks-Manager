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
		"guest": "guest",
		"Employee": "Employee",
		"Administrator": "Administrator",
		"Supervisor": "Supervisor"
	}
})

;
})(angular);