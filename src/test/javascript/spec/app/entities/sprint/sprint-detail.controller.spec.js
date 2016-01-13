'use strict';

describe('Controller Tests', function() {

    describe('Sprint Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockSprint, MockUserSprint;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockSprint = jasmine.createSpy('MockSprint');
            MockUserSprint = jasmine.createSpy('MockUserSprint');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Sprint': MockSprint,
                'UserSprint': MockUserSprint
            };
            createController = function() {
                $injector.get('$controller')("SprintDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'stocklyApp:sprintUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
