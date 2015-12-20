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
        vm.filters = {
            name: '',
            location: ''
        };

        activate();

        function activate() {
            logger.info('Activated HR View');

            vm.tableParams = new NgTableParams(
                                {page: 1, count: 5, filter: vm.filters},
                                {counts: [5, 10, 20],
                                getData: getPeopleList});
        }

        function getPeopleList($defer, params) {
            var reqParams = {
                filter: params.filter(),
                pageIndex: params.page(),
                pageSize: params.count()
            };
            dataservice.getPeopleList(reqParams).then(function (res) {
                params.total(res.total);
                $defer.resolve(res.data);
            });
        }
    }
})();
