'use strict';

angular.module('stocklyApp')
	.controller('UserSprintDeleteController', function($scope, $uibModalInstance, entity, UserSprint) {

        $scope.userSprint = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            UserSprint.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
