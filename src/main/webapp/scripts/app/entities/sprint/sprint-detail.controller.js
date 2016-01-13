'use strict';

angular.module('stocklyApp')
    .controller('SprintDetailController', function ($scope, $rootScope, $stateParams, entity, Sprint, UserSprint) {
        $scope.sprint = entity;
        $scope.load = function (id) {
            Sprint.get({id: id}, function(result) {
                $scope.sprint = result;
            });
        };
        var unsubscribe = $rootScope.$on('stocklyApp:sprintUpdate', function(event, result) {
            $scope.sprint = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
