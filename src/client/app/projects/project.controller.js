(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$q', 'logger'];

    /* @ngInject */
    function ProjectsController($q, logger) {

    }
})();
