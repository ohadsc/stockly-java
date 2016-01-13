'use strict';

angular.module('stocklyApp')
	.controller('SprintDeleteController', function($scope, $uibModalInstance, entity, Sprint) {

        $scope.sprint = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Sprint.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
