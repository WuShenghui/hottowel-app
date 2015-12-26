(function () {
    'use strict';

    angular
    .module('app.department.hr')
    .controller('HRFormController', HRFormController);

    HRFormController.$inject = ['$q', '$state', '$stateParams', 'logger', 'Data'];
    /* @ngInject */
    function HRFormController($q, $state, $stateParams, logger, Data) {
        var vm = this;
        vm.title = 'HR Form';
        vm.save = save;

        activate();

        function activate() {
            var id = $stateParams.id;
            if (id > 0) {
                vm.entity = Data.get({id: id});
            } else {
                vm.entity = new Data();
            }

            logger.info('Activated HR Form View');
        }

        function save() {
            if (vm.entity.id) {
                vm.entity.$update(function () {
                    logger.info('update success!');
                });
            } else {
                vm.entity.$save(function () {
                    logger.info('add success');
                });
            }
            $state.go('department-hr');
        }
    }
})();
