(function () {
    'use strict';

    angular
        .module('app.department.sales')
        .controller('SalesController', SalesController);

    SalesController.$inject = ['logger'];
    /* @ngInject */
    function SalesController(logger) {
        var vm = this;
        vm.title = 'Sales';

        activate();

        function activate() {
            logger.info('Activated Sales View');
        }
    }
})();
