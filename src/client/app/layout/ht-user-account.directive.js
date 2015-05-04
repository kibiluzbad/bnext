(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htUserAccount', htUserAccount);

    htUserAccount.$inject = ['principal','logger'];

    /* @ngInject */
    function htUserAccount(principal,logger) {
        //Usage:
        //<div ht-user-account></div>
        // Creates:
        // <div ht-user-account=""
        //      title="Movie"
        //      allow-collapse="true" </div>
        var directive = {
            scope: {},
            templateUrl: 'app/layout/user-account.html',
            restrict: 'EA',
            controller: UserAccountController,
            controllerAs: 'vm'
        };

        return directive;

        function UserAccountController(){
            var vm = this;

            activated();

            function activated(){
                principal.identity().then(function(user){
                    vm.user = user;
                });
            }
        }
    }
})();
