'use strict';

angular.module('stocklyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('sprint', {
                parent: 'entity',
                url: '/sprints',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Sprints'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/sprint/sprints.html',
                        controller: 'SprintController'
                    }
                },
                resolve: {
                }
            })
            .state('sprint.detail', {
                parent: 'entity',
                url: '/sprint/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Sprint'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/sprint/sprint-detail.html',
                        controller: 'SprintDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Sprint', function($stateParams, Sprint) {
                        return Sprint.get({id : $stateParams.id});
                    }]
                }
            })
            .state('sprint.new', {
                parent: 'sprint',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/sprint/sprint-dialog.html',
                        controller: 'SprintDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('sprint', null, { reload: true });
                    }, function() {
                        $state.go('sprint');
                    })
                }]
            })
            .state('sprint.edit', {
                parent: 'sprint',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/sprint/sprint-dialog.html',
                        controller: 'SprintDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Sprint', function(Sprint) {
                                return Sprint.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('sprint', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('sprint.delete', {
                parent: 'sprint',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/sprint/sprint-delete-dialog.html',
                        controller: 'SprintDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Sprint', function(Sprint) {
                                return Sprint.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('sprint', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
