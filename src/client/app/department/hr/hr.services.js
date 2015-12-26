(function () {
    'use strict';

    angular
	.module('app.department.hr')
	.factory('Data', ResourceService);

    ResourceService.$inject = ['$resource'];
    function ResourceService($resource) {
        return $resource('/api/people/:id',
			{id: '@_id'},
			{query: {method: 'GET', isArray: false},
			update: {method: 'PUT'}
			},
			{stripTrailingSlashes: false}
		);
    }
})();
