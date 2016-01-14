'use strict';

angular.module('stocklyApp')
    .factory('UserSprint', function ($resource, DateUtils) {
        return $resource('api/userSprints/:id', {}, {
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
