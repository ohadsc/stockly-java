'use strict';

angular.module('stocklyApp')
	.controller('UserStockDeleteController', function($scope, $uibModalInstance, entity, UserStock) {

        $scope.userStock = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            UserStock.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
