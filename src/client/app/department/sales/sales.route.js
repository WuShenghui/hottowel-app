(function() {
    'use strict';

    angular
        .module('app.department.sales')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'department-sales',
                config: {
                    url: '/department/sales',
                    templateUrl: 'app/department/sales/sales.html',
                    controller: 'SalesController',
                    controllerAs: 'vm',
                    title: 'Sales',
                    settings: {
                        nav: 2,
                        menuGroup: 'Department',
                        icon: 'fa fa-map-marker',
                        type: 'link',
                        state: 'department-sales',
                    }
                }
            }
        ];
    }
})();
