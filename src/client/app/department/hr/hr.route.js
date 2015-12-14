(function() {
    'use strict';

    angular
        .module('app.department.hr')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'department-hr',
                config: {
                    url: '/department/hr',
                    templateUrl: 'app/department/hr/hr.html',
                    controller: 'HRController',
                    controllerAs: 'vm',
                    title: 'HR',
                    settings: {
                        nav: 3,
                        menuGroup: 'Department',
                        icon: 'fa fa-group',
                        type: 'link',
                        state: 'department-hr',
                    }
                }
            }
        ];
    }
})();
