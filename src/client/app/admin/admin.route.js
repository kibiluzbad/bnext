(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Admin',
                    pageTitle: 'Admin',
                    parent:'internal',
                    data:{
                        roles:['User']
                    },
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    },
                    ncyBreadcrumb: {
                        label: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }
        ];
    }
})();
