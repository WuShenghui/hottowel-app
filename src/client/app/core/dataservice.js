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
            getMessageCount: getMessageCount,
            addPerson: addPerson
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch('getPeople', fail);
        }

        function getPeopleList(params) {
            var reqParams = params.pageIndex + '/' + params.pageSize;
            reqParams = reqParams + '/' + JSON.stringify(params.filter);
            return $http.get('/api/peopleList/' + reqParams)
                .then(success)
                .catch('getPeopleList', fail);
        }

        function addPerson(params) {
            return $http.post('/api/people/' + params)
                .then(success)
                .catch('addPerson', fail);
        }

        function success(response) {
            return response.data ? response.data : null;
        }

        function fail(functionName, e) {
            return exception.catcher('XHR Failed for ' + functionName)(e);
        }
    }
})();
