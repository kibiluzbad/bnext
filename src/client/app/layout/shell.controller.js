(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', '$document'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, $document) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Created by John Papa',
            link: 'http://twitter.com/john_papa'
        };
        vm.layoutPath = '/app/layout/public-shell.html';

        //TODO: Place it inside a directive
        $rootScope.$on('authentication-successful',function(){
            $document.find('body').removeClass('login-page');
            $document.find('body').addClass('skin-purple')
        })

        activate();

        function activate() {
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();
