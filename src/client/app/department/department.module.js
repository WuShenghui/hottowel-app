(function() {
    'use strict';

    angular.module('app.department', [
        'app.core',
        'app.widgets',
		'app.department.it',
        'app.department.hr',
        'app.department.sales'
      ]);
})();
