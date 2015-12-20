(function () {
    'use strict';

    angular
        .module('app.department.hr')
        .controller('HRFormController', HRFormController);

    HRFormController.$inject = ['$q', '$state', 'dataservice', 'logger'];
    /* @ngInject */
    function HRFormController($q, $state, dataservice, logger) {
        var vm = this;
        vm.title = 'HR Form';
        vm.save = save;

        activate();

        function activate() {
            logger.info('Activated HR Form View');
        }

        function save() {
            var person = {
                id: 0,
                firstName: vm.firstName,
                lastName: vm.lastName,
                age: vm.age,
                location: vm.location
            };
            dataservice.addPerson(JSON.stringify(person)).then(function (res) {
                logger.info('Added successfully!');
                $state.go('department-hr');
            });
        }
    }
})();
