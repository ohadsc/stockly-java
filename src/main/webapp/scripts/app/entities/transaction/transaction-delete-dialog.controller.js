'use strict';

angular.module('stocklyApp')
	.controller('TransactionDeleteController', function($scope, $uibModalInstance, entity, Transaction) {

        $scope.transaction = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Transaction.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
