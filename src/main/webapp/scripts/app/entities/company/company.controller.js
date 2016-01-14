'use strict';

angular.module('stocklyApp')
    .controller('CompanyController', function ($scope, $state, Company) {

        $scope.companys = [];
        $scope.loadAll = function() {
            Company.query(function(result) {
               $scope.companys = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.company = {
                name: null,
                symbol: null,
                industry: null,
                sector: null,
                id: null
            };
        };
    });
