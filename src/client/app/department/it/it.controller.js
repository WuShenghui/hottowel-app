(function () {
    'use strict';

    angular
        .module('app.department.it')
        .controller('ITController', ITController);

    ITController.$inject = ['logger'];
    /* @ngInject */
    function ITController(logger) {
        var vm = this;
        vm.title = 'IT';

        activate();

        function activate() {
            logger.info('Activated IT View');
        }
    }
})();
