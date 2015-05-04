(function() {
    'use strict';

    angular
        .module('blocks.security')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'authorization','$rootScope','principal','logger'];

    /* @ngInject */
    function appRun(routerHelper,authorization,$rootScope,principal,logger) {
        routerHelper.configureStates(getStates(authorization));

        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {

            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (principal.isIdentityResolved()) authorization.authorize();
        });
    }

    function getStates(authorization) {
        return [
            {
                state: 'public' ,
                config: {
                    abstract: true,
                    templateUrl: 'app/layout/public-shell.html'
                }
            },
            {
                state: 'internal' ,
                config: {
                    abstract: true,
                    resolve: {
                        authorize: ['authorization',
                            function (authorization) {
                                return authorization.authorize();
                            }
                        ]
                    },
                    templateUrl: 'app/layout/internal-shell.html'
                }
            },
            {
                state: 'signin',
                config: {
                    url: '/signin',
                    templateUrl: 'app/blocks/security/signin.html',
                    controller: 'SigninController',
                    controllerAs: 'vm',
                    title: 'Signin',
                    pageTitle: '',
                    settings: {},
                    ncyBreadcrumb: {},
                    parent:'public',
                    data:{
                        roles:[]
                    }
                }
            },
            {
                state: 'signout',
                config: {
                    url: '/signout',
                    template: '<ui-view/>',
                    controller: 'SignoutController',
                    controllerAs: 'vm',
                    title: 'Signout',
                    pageTitle: '',
                    settings: {},
                    ncyBreadcrumb: {},
                    parent:'public',
                    data:{
                        roles:[]
                    }
                }
            }
        ];
    }
})();
