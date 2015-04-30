(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htUserPanel', htUserPanel);

    /* @ngInject */
    function htUserPanel() {
        //Usage:
        //<div ht-user-account></div>
        // Creates:
        // <div ht-user-account=""
        //      title="Movie"
        //      allow-collapse="true" </div>
        var directive = {
            scope: {},
            templateUrl: 'app/layout/user-panel.html',
            restrict: 'EA'
        };
        return directive;
    }
})();
