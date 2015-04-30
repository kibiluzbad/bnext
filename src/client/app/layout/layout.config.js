(function() {
    'use strict';

    angular
        .module('app.layout')
        .config(config);

    /* @ngInject */
    function config($breadcrumbProvider){
        $breadcrumbProvider.setOptions({
            template: "<section class=\"content-header\">\
                        <h1>{{$root.pageTitle}} \
                            <small>Version 2.0</small>\
                       </h1>\
                       <ol class=\"breadcrumb\">\
                            <li ng-show=\"$last\" ng-class=\"{active:$last}\" ng-repeat=\"step in steps\">\
                                <a href=\"#\" ng-if=\"!$last\" ng-bind-html=\"step.ncyBreadcrumbLabel\"></a>\
                                <span ng-if=\"$last\" ng-bind-html='step.ncyBreadcrumbLabel'></span>\
                            </li>\
                       </ol>\
                       </section>"
        });
    }

})();
