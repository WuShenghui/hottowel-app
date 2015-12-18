(function () {
    'use strict';

    angular
        .module('app.department.hr')
        .controller('HRController', HRController);

    HRController.$inject = ['$q', 'dataservice', 'logger', 'NgTableParams'];
    /* @ngInject */
    function HRController($q, dataservice, logger, NgTableParams) {
        var vm = this;
        vm.title = 'HR';

        activate();

        function activate() {
            logger.info('Activated HR View');

            vm.tableParams = new NgTableParams(
                                {page: 1, count: 5},
                                {counts: [5, 10, 20],
                                getData: getPeopleList});
        }

        function getPeopleList(params) {
            var reqParams = {pageIndex: params.page(), pageSize: params.count()};
            return dataservice.getPeopleList(reqParams).then(function (data) {
                vm.people = data;
                params.total(data.length);
                return vm.people;
            });
        }
    }
})();
