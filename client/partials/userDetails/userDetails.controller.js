'use strict';
(function () {
class userDetailsController {
    constructor(usersFactory, $state) {
        this.$state = $state;
        this.usersFactory = usersFactory;
        this.user = null;
        
        this.initialize();
    }
    
    initialize() {
        this.getUser();
    }
    
    getUser() {
        let that = this;
        this.usersFactory.getUserById(this.$state.params.id)
            .then((res) => {
                that.user = res.data;
            })
    }
    
}

  angular.module('tasksAdminApp')
    .component('userDetails', {
      templateUrl: 'partials/userDetails/userDetails.html',
      controller: userDetailsController,
      controllerAs: 'vm'
    });

})();
