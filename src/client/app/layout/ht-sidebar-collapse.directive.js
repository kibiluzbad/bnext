(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htSidebarCollapse', htSidebarCollapse);

    htSidebarCollapse.$inject = ["$document"];

    /* @ngInject */
    function htSidebarCollapse ($document) {
        // Toggle sidebar collapse.
        // Usage:
        //  <div ht-sidebar-collapse>
        //  <div ht-sidebar-collapse whenDoneAnimating="vm.sidebarReady()">
        // Creates:
        //  <div ht-sidebar-collapse class="sidebar">
        var directive = {
            bindToController: true,
            link: link,
            restrict: 'EA',
            scope: {
                whenDoneAnimating: '&?'
            }
        };

        return directive;

        function link(scope, element, attrs) {
            var sidebaCollpaseClass='sidebar-collapse';

            var $body = $document.find('body');

            element.bind('click',toogleCollapse);

            function toogleCollapse(event){
               $body.hasClass(sidebaCollpaseClass)
                    ? $body.removeClass(sidebaCollpaseClass,scope.whenDoneAnimating)
                    : $body.addClass(sidebaCollpaseClass,scope.whenDoneAnimating);
            }
        }
    }
})();
