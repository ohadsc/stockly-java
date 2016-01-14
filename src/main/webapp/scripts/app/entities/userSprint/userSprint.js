'use strict';

angular.module('stocklyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userSprint', {
                parent: 'entity',
                url: '/userSprints',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'UserSprints'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userSprint/userSprints.html',
                        controller: 'UserSprintController'
                    }
                },
                resolve: {
                }
            })
            .state('userSprint.detail', {
                parent: 'entity',
                url: '/userSprint/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'UserSprint'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userSprint/userSprint-detail.html',
                        controller: 'UserSprintDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'UserSprint', function($stateParams, UserSprint) {
                        return UserSprint.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userSprint.new', {
                parent: 'userSprint',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userSprint/userSprint-dialog.html',
                        controller: 'UserSprintDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    cash: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('userSprint', null, { reload: true });
                    }, function() {
                        $state.go('userSprint');
                    })
                }]
            })
            .state('userSprint.edit', {
                parent: 'userSprint',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userSprint/userSprint-dialog.html',
                        controller: 'UserSprintDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserSprint', function(UserSprint) {
                                return UserSprint.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userSprint', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('userSprint.delete', {
                parent: 'userSprint',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userSprint/userSprint-delete-dialog.html',
                        controller: 'UserSprintDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['UserSprint', function(UserSprint) {
                                return UserSprint.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userSprint', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
