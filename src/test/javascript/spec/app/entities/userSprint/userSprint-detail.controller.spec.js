'use strict';

describe('Controller Tests', function() {

    describe('UserSprint Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockUserSprint, MockUser, MockSprint;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockUserSprint = jasmine.createSpy('MockUserSprint');
            MockUser = jasmine.createSpy('MockUser');
            MockSprint = jasmine.createSpy('MockSprint');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'UserSprint': MockUserSprint,
                'User': MockUser,
                'Sprint': MockSprint
            };
            createController = function() {
                $injector.get('$controller')("UserSprintDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'stocklyApp:userSprintUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
