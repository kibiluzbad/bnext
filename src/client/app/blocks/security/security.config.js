(function() {
    'use strict';

    var config = {
        oauthUrl:'http://localhost:3000'
    };

    angular.module('blocks.authentication')
        .value('config',config);



})();
