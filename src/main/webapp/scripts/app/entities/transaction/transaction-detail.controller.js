'use strict';

angular.module('stocklyApp')
    .controller('TransactionDetailController', function ($scope, $rootScope, $stateParams, entity, Transaction, User, Stock, Sprint) {
        $scope.transaction = entity;
        $scope.load = function (id) {
            Transaction.get({id: id}, function(result) {
                $scope.transaction = result;
            });
        };
        var unsubscribe = $rootScope.$on('stocklyApp:transactionUpdate', function(event, result) {
            $scope.transaction = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
