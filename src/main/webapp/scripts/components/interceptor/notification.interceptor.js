 'use strict';

angular.module('stocklyApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-stocklyApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-stocklyApp-params')});
                }
                return response;
            }
        };
    });
