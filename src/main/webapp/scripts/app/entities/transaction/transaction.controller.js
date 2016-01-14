'use strict';

angular.module('stocklyApp')
    .controller('TransactionController', function ($scope, $state, Transaction) {

        $scope.transactions = [];
        $scope.loadAll = function() {
            Transaction.query(function(result) {
               $scope.transactions = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.transaction = {
                type: null,
                price: null,
                date: null,
                id: null
            };
        };
    });
