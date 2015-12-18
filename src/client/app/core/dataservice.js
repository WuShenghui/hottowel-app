(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getPeople: getPeople,
            getPeopleList: getPeopleList,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch(fail);
        }

        function getPeopleList(params) {
            var reqParams = params.pageIndex + '/' + params.pageSize;
            return $http.get('/api/peopleList/' + reqParams)
                .then(success)
                .catch(fail);
        }

        function success(response) {
            return response.data;
        }

        function fail(e) {
            return exception.catcher('XHR Failed for getPeople')(e);
        }
    }
})();
