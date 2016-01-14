'use strict';

angular.module('stocklyApp')
    .controller('CompanyDetailController', function ($scope, $rootScope, $stateParams, entity, Company) {
        $scope.company = entity;
        $scope.load = function (id) {
            Company.get({id: id}, function(result) {
                $scope.company = result;
            });
        };
        var unsubscribe = $rootScope.$on('stocklyApp:companyUpdate', function(event, result) {
            $scope.company = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
