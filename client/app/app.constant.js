(function(angular, undefined) {
  angular.module("tasksAdminApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})

;
})(angular);