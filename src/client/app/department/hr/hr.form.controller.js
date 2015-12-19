(function () {
    'use strict';

    angular
        .module('app.department.hr')
        .controller('HRFormController', HRFormController);

    HRFormController.$inject = ['$q', 'dataservice', 'logger', 'NgTableParams'];
    /* @ngInject */
    function HRFormController($q, dataservice, logger, NgTableParams) {
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

        function getPeopleList($defer, params) {
            var reqParams = {pageIndex: params.page(), pageSize: params.count()};
            dataservice.getPeopleList(reqParams).then(function (res) {
                params.total(res.total);
                $defer.resolve(res.data);
            });
        }
    }
})();
