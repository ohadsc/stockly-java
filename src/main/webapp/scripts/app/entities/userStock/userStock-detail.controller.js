'use strict';

angular.module('stocklyApp')
    .controller('UserStockDetailController', function ($scope, $rootScope, $stateParams, entity, UserStock, Sprint, User, Stock) {
        $scope.userStock = entity;
        $scope.load = function (id) {
            UserStock.get({id: id}, function(result) {
                $scope.userStock = result;
            });
        };
        var unsubscribe = $rootScope.$on('stocklyApp:userStockUpdate', function(event, result) {
            $scope.userStock = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
