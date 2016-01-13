'use strict';

angular.module('stocklyApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


