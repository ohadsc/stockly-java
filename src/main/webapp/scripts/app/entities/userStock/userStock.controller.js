'use strict';

angular.module('stocklyApp')
    .controller('UserStockController', function ($scope, $state, UserStock) {

        $scope.userStocks = [];
        $scope.loadAll = function() {
            UserStock.query(function(result) {
               $scope.userStocks = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userStock = {
                amount: null,
                buyPrice: null,
                id: null
            };
        };
    });
