(function () {
    'use strict';

    angular
        .module('blocks.security')
        .controller('SigninController', SigninController);

    SigninController.$inject = ['$scope', '$state', 'principal','logger'];

    /* @ngInject */
    function SigninController($scope, $state, principal, logger) {
        var vm = this;
        vm.user = {
            name:'Test user',
            roles:['User']
        };
        vm.signin = signin;

        activate();

        function activate() {

        }

        function signin() {
            principal.authenticate(vm.user);

            $scope.returnToState
                ? $state.go($scope.returnToState.name, $scope.returnToStateParams)
                : $state.go('dashboard');
        }
    }
})();
