'use strict';

angular.module('stocklyApp')
	.controller('StockDeleteController', function($scope, $uibModalInstance, entity, Stock) {

        $scope.stock = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Stock.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
