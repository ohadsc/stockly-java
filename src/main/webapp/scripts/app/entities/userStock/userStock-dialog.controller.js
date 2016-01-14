'use strict';

angular.module('stocklyApp').controller('UserStockDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserStock', 'Sprint', 'User', 'Stock',
        function($scope, $stateParams, $uibModalInstance, entity, UserStock, Sprint, User, Stock) {

        $scope.userStock = entity;
        $scope.sprints = Sprint.query();
        $scope.users = User.query();
        $scope.stocks = Stock.query();
        $scope.load = function(id) {
            UserStock.get({id : id}, function(result) {
                $scope.userStock = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('stocklyApp:userStockUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.userStock.id != null) {
                UserStock.update($scope.userStock, onSaveSuccess, onSaveError);
            } else {
                UserStock.save($scope.userStock, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
