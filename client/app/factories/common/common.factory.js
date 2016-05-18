'use strict';
(function () {


    function commonFactory() {

        var commonFactory = {
            toJSONLocal: toJSONLocal
        };

        return commonFactory;

        function toJSONLocal(date) {
            var local = new Date(date);
            //local.setMinutes(date.getMinutes() - date.getTimezoneOffset()); --> To normalize dates with timezone - http://stackoverflow.com/a/11172083
            return local.toJSON().slice(0, 10);
        }

    }

    angular.module('tasksAdminApp.common')
        .factory('commonFactory', commonFactory);
})();








