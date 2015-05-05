(function() {
    'use strict';

    angular
        .module('blocks.configuration')
        .factory('configuration',configuration);

    function configuration(){
        //TODO: Get config per env
        var config = {
            apiRootUri:'http://localhost:3000',
            oauthUri:'http://localhost:3000',
            clientId:'client_id',
            clientSecret:'client_secret'
        };

        return config;
    }

})();
