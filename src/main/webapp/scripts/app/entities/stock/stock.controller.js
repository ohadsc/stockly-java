'use strict';

angular.module('stocklyApp')
    .controller('StockController', function ($scope, $state, Stock) {

        $scope.stocks = [];
        $scope.loadAll = function() {
            Stock.query(function(result) {
               $scope.stocks = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.stock = {
                symbol: null,
                value: null,
                change: null,
                name: null,
                url: null,
                id: null
            };
        };
    });
