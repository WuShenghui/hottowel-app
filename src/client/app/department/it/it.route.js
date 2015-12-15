(function() {
    'use strict';

    angular
        .module('app.department.it')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'department-it',
                config: {
                    url: '/department/it',
                    templateUrl: 'app/department/it/it.html',
                    controller: 'ITController',
                    controllerAs: 'vm',
                    title: 'IT',
                    settings: {
                        nav: 1,
                        menuGroup: 'Department',
                        icon: 'fa fa-group',
                        type: 'link',
                        state: 'department-it',
                    }
                }
            }
        ];
    }
})();
