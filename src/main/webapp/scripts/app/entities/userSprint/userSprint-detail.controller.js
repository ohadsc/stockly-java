'use strict';

angular.module('stocklyApp')
    .controller('UserSprintDetailController', function ($scope, $rootScope, $stateParams, entity, UserSprint, User, Sprint) {
        $scope.userSprint = entity;
        $scope.load = function (id) {
            UserSprint.get({id: id}, function(result) {
                $scope.userSprint = result;
            });
        };
        var unsubscribe = $rootScope.$on('stocklyApp:userSprintUpdate', function(event, result) {
            $scope.userSprint = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
