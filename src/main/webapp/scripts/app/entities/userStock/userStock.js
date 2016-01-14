'use strict';

angular.module('stocklyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userStock', {
                parent: 'entity',
                url: '/userStocks',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'UserStocks'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStock/userStocks.html',
                        controller: 'UserStockController'
                    }
                },
                resolve: {
                }
            })
            .state('userStock.detail', {
                parent: 'entity',
                url: '/userStock/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'UserStock'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userStock/userStock-detail.html',
                        controller: 'UserStockDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'UserStock', function($stateParams, UserStock) {
                        return UserStock.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userStock.new', {
                parent: 'userStock',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStock/userStock-dialog.html',
                        controller: 'UserStockDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    amount: null,
                                    buyPrice: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('userStock', null, { reload: true });
                    }, function() {
                        $state.go('userStock');
                    })
                }]
            })
            .state('userStock.edit', {
                parent: 'userStock',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStock/userStock-dialog.html',
                        controller: 'UserStockDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserStock', function(UserStock) {
                                return UserStock.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStock', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('userStock.delete', {
                parent: 'userStock',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/userStock/userStock-delete-dialog.html',
                        controller: 'UserStockDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['UserStock', function(UserStock) {
                                return UserStock.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userStock', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
