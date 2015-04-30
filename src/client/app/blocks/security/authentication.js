(function() {
    'use strict';

    angular
        .module('blocks.security')
        .factory('authentication', authentication);

    authentication.$inject = ['logger','$http','config'];

    /* @ngInject */
    function authentication(logger,$http, config) {
        var service = {
            authenticate: authenticate
        };

        return service;

        ////////////////

        function authenticate(principal){

        }
    }
})();
