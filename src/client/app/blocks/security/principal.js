(function() {
    'use strict';

    angular
        .module('blocks.security')
        .factory('principal', principal);

    authorization.$inject = ['logger','$http','config'];

    /* @ngInject */
    function principal(logger,$http, config) {
        var service = {
            isIdentityResolved: isIdentityResolved,
            isAuthenticated: isAuthenticated,
            isInRole: isInRole,
            isInAnyRole: isInAnyRole,
            identity: identity
        };

        return service;

        ////////////////

        function isIdentityResolved(){

        }

        function isAuthenticated(){

        }

        function isInRole(){

        }

        function isInAnyRole(){

        }

        function authenticate(){

        }

        function identity(){

        }
    }
})();
