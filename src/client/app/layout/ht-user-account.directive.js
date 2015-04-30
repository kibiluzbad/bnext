(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htUserAccount', htUserAccount);

    /* @ngInject */
    function htUserAccount() {
        //Usage:
        //<div ht-user-account></div>
        // Creates:
        // <div ht-user-account=""
        //      title="Movie"
        //      allow-collapse="true" </div>
        var directive = {
            scope: {},
            templateUrl: 'app/layout/user-account.html',
            restrict: 'EA'
        };
        return directive;
    }
})();
