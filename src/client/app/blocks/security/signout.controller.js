(function () {
    'use strict';

    angular
        .module('blocks.security')
        .controller('SignoutController', SignoutController);

    SignoutController.$inject = ['$scope', '$state', 'principal','logger'];

    /* @ngInject */
    function SignoutController($scope, $state, principal, logger) {
        var vm = this;

        activate();

        function activate() {
            principal.cleanUp();
            $state.go('dashboard');
        }


    }
})();
