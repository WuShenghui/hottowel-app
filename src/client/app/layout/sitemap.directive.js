(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('sitemap', sitemap);

    /* @ngInject */
    function sitemap () {
        var directive = {
            bindToController: true,
            controller: SitemapController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {},
            templateUrl: 'app/layout/sitemap.html'
        };

        /* @ngInject */
        SitemapController.$inject = ['$rootScope'];
        function SitemapController($rootScope) {
            var vm = this;
        }

        return directive;
    }
})();
