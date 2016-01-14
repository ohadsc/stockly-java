'use strict';

angular.module('stocklyApp').controller('UserSprintDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserSprint', 'User', 'Sprint',
        function($scope, $stateParams, $uibModalInstance, entity, UserSprint, User, Sprint) {

        $scope.userSprint = entity;
        $scope.users = User.query();
        $scope.sprints = Sprint.query();
        $scope.load = function(id) {
            UserSprint.get({id : id}, function(result) {
                $scope.userSprint = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('stocklyApp:userSprintUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.userSprint.id != null) {
                UserSprint.update($scope.userSprint, onSaveSuccess, onSaveError);
            } else {
                UserSprint.save($scope.userSprint, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
