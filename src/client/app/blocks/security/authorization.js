(function() {
    'use strict';

    angular
        .module('blocks.security')
        .factory('authorization', authorization);

    authorization.$inject = ['logger','$http','config'];

    /* @ngInject */
    function authorization(logger,$http, config) {
        var service = {
            authorize: authorize
        };

        return service;

        ////////////////

        function authorize(){

        }
    }
})();
