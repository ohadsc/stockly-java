'use strict';

describe('Controller Tests', function() {

    describe('UserStock Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockUserStock, MockSprint, MockUser, MockStock;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockUserStock = jasmine.createSpy('MockUserStock');
            MockSprint = jasmine.createSpy('MockSprint');
            MockUser = jasmine.createSpy('MockUser');
            MockStock = jasmine.createSpy('MockStock');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'UserStock': MockUserStock,
                'Sprint': MockSprint,
                'User': MockUser,
                'Stock': MockStock
            };
            createController = function() {
                $injector.get('$controller')("UserStockDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'stocklyApp:userStockUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
