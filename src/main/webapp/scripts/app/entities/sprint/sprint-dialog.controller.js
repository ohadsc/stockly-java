'use strict';

angular.module('stocklyApp').controller('SprintDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Sprint', 'UserSprint',
        function($scope, $stateParams, $uibModalInstance, entity, Sprint, UserSprint) {

        $scope.sprint = entity;
        $scope.usersprints = UserSprint.query();
        $scope.load = function(id) {
            Sprint.get({id : id}, function(result) {
                $scope.sprint = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('stocklyApp:sprintUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.sprint.id != null) {
                Sprint.update($scope.sprint, onSaveSuccess, onSaveError);
            } else {
                Sprint.save($scope.sprint, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
