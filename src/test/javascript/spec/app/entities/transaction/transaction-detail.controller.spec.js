'use strict';

describe('Controller Tests', function() {

    describe('Transaction Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockTransaction, MockUser, MockStock, MockSprint;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockTransaction = jasmine.createSpy('MockTransaction');
            MockUser = jasmine.createSpy('MockUser');
            MockStock = jasmine.createSpy('MockStock');
            MockSprint = jasmine.createSpy('MockSprint');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Transaction': MockTransaction,
                'User': MockUser,
                'Stock': MockStock,
                'Sprint': MockSprint
            };
            createController = function() {
                $injector.get('$controller')("TransactionDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'stocklyApp:transactionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
