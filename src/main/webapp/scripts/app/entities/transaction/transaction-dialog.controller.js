'use strict';

angular.module('stocklyApp').controller('TransactionDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Transaction', 'User', 'Stock', 'Sprint',
        function($scope, $stateParams, $uibModalInstance, entity, Transaction, User, Stock, Sprint) {

        $scope.transaction = entity;
        $scope.users = User.query();
        $scope.stocks = Stock.query();
        $scope.sprints = Sprint.query();
        $scope.load = function(id) {
            Transaction.get({id : id}, function(result) {
                $scope.transaction = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('stocklyApp:transactionUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.transaction.id != null) {
                Transaction.update($scope.transaction, onSaveSuccess, onSaveError);
            } else {
                Transaction.save($scope.transaction, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.datePickerForDate = {};

        $scope.datePickerForDate.status = {
            opened: false
        };

        $scope.datePickerForDateOpen = function($event) {
            $scope.datePickerForDate.status.opened = true;
        };
}]);
