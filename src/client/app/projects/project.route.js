(function() {
    'use strict';

    angular
        .module('app.projects')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'projects',
                config: {
                    url: '/builds',
                    templateUrl: 'app/projects/builds.html',
                    controller: 'BuildsController',
                    controllerAs: 'vm',
                    title: 'builds',
                    pageTitle: 'builds',
                    parent:'internal',
                    data:{
                        roles:['User']
                    },
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-code"></i> Builds'
                    },
                    ncyBreadcrumb: {
                        label: '<i class="fa fa-code"></i> Builds'
                    }
                }
            }
        ];
    }
})();
