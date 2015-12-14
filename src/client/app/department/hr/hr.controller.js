(function () {
    'use strict';

    angular
        .module('app.department.hr')
        .controller('HRController', HRController);

    HRController.$inject = ['logger'];
    /* @ngInject */
    function HRController(logger) {
        var vm = this;
        vm.title = 'HR';

        activate();

        function activate() {
            logger.info('Activated HR View');
        }
    }
})();
