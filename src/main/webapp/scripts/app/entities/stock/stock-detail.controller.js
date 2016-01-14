'use strict';

angular.module('stocklyApp')
    .controller('StockDetailController', function ($scope, $rootScope, $stateParams, entity, Stock) {
        $scope.stock = entity;
        $scope.load = function (id) {
            Stock.get({id: id}, function(result) {
                $scope.stock = result;
            });
        };
        var unsubscribe = $rootScope.$on('stocklyApp:stockUpdate', function(event, result) {
            $scope.stock = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
