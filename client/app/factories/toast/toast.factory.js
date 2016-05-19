'use strict';
(function () {


  function toastFactory($http, $mdToast) {
    var parentEl = angular.element(document.body);
    var toastFactory = {
      successToast: successToast,
      errorToast: errorToast
    };

    return toastFactory;

    function successToast(message) {
      $mdToast.show({
        parent: parentEl,
        templateUrl: './app/factories/toast/partials/success/toast.success.html',
        controller:  toastSuccessController,
        controllerAs: 'vm',
        locals: {
          message: message || null
        },  
        hideDelay: 1000,
        position: 'top right'
      });
    }

    function errorToast(message) {
      $mdToast.show({
        parent: parentEl,
        templateUrl: './app/factories/toast/partials/error/toast.error.html',
        controller:  toastErrorController,
        controllerAs: 'vm',
        locals: {
          message: message || null
        },  
        hideDelay: 1000,
        position: 'bottom right'
      });
    }


  }

  angular.module('tasksAdminApp.toastFactory', [])
    .factory('toastFactory', toastFactory);
})();








