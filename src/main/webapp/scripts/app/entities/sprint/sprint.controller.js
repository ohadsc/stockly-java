'use strict';

angular.module('stocklyApp')
    .controller('SprintController', function ($scope, $state, Sprint) {

        $scope.sprints = [];
        $scope.loadAll = function() {
            Sprint.query(function(result) {
               $scope.sprints = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.sprint = {
                name: null,
                id: null
            };
        };
    });
