'use strict';
(function () {


  function toastFactory($http, $mdToast) {

    var toastFactory = {
      successToast: successToast,
    };

    return toastFactory;

    function successToast(message) {
      $mdToast.show({
        templateUrl: './app/factories/toast/partials/success/toast.success.html',
        controller:  toastSuccessController,
        controllerAs: 'vm',
        locals: {
          message: message || null
        },  
        hideDelay: 1000,
        position: 'bottom right'
      });
    }

    function errorToast() {

    }


  }

  angular.module('tasksAdminApp.toastFactory', [])
    .factory('toastFactory', toastFactory);
})();








