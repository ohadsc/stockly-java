'use strict';

angular.module('stocklyApp')
    .controller('UserSprintController', function ($scope, $state, UserSprint) {

        $scope.userSprints = [];
        $scope.loadAll = function() {
            UserSprint.query(function(result) {
               $scope.userSprints = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userSprint = {
                cash: null,
                id: null
            };
        };
    });
