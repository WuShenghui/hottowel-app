(function () {
    'use strict';

    angular
        .module('app.department.hr')
        .controller('HRController', HRController);

    HRController.$inject = ['$q', 'logger', 'NgTableParams', 'Data'];
    /* @ngInject */
    function HRController($q, logger, NgTableParams, Data) {
        var vm = this;
        vm.title = 'HR';
        vm.delete = deleteItem;
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
            Data.query({filters: reqParams}, function (res) {
                params.total(res.total);
                $defer.resolve(res.data);
            });
        }

        function deleteItem (item) {
            Data.delete({id: item.id}, function() {
                logger.info('delete');
                activate();
            });
        }
    }
})();
