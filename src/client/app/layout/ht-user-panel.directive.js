(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htUserPanel', htUserPanel);

    htUserPanel.$inject = ['principal','logger'];

    /* @ngInject */
    function htUserPanel(principal,logger) {
        //Usage:
        //<div ht-user-account></div>
        // Creates:
        // <div ht-user-account=""
        //      title="Movie"
        //      allow-collapse="true" </div>
        var directive = {
            scope: {},
            templateUrl: 'app/layout/user-panel.html',
            restrict: 'EA',
            controller: UserPanelController,
            controllerAs: 'vm'
        };
        return directive;

        function UserPanelController(){
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
