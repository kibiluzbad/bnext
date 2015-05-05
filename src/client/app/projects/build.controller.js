(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('BuildsController', BuildsController);

    BuildsController.$inject = ['build', 'logger'];

    /* @ngInject */
    function BuildsController(build, logger) {
        var vm = this;
        vm.builds = [];

        build.query(querySuccess);

        function querySuccess(data){
            vm.builds = data;
        }

    }
})();
