(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htSearchForm', htSearchForm);

    /* @ngInject */
    function htSearchForm() {
        //Usage:
        //<div ht-user-account></div>
        // Creates:
        // <div ht-user-account=""
        //      title="Movie"
        //      allow-collapse="true" </div>
        var directive = {
            scope: {},
            templateUrl: 'app/layout/search-form.html',
            restrict: 'EA'
        };
        return directive;
    }
})();
