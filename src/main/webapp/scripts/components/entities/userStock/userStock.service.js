'use strict';

angular.module('stocklyApp')
    .factory('UserStock', function ($resource, DateUtils) {
        return $resource('api/userStocks/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
