(function() {
    'use strict';

    angular
    .module('app.department.hr')
    .run(appRun);

    /* @ngInject */
    appRun.$inject = ['routerHelper'];
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
                    icon: 'fa fa-user-plus',
                    type: 'link',
                    state: 'department-hr',
                }
            }
        },
        {
            state: 'department-hr-form',
            config: {
                url: '/department/hr/form',
                templateUrl: 'app/department/hr/hr.form.html',
                controller: 'HRController',
                controllerAs: 'vm',
                title: 'HR',
                settings: {
                }
            }
        }];
    }
})();
