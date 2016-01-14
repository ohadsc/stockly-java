'use strict';

angular.module('stocklyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('stock', {
                parent: 'entity',
                url: '/stocks',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Stocks'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/stock/stocks.html',
                        controller: 'StockController'
                    }
                },
                resolve: {
                }
            })
            .state('stock.detail', {
                parent: 'entity',
                url: '/stock/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Stock'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/stock/stock-detail.html',
                        controller: 'StockDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Stock', function($stateParams, Stock) {
                        return Stock.get({id : $stateParams.id});
                    }]
                }
            })
            .state('stock.new', {
                parent: 'stock',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/stock/stock-dialog.html',
                        controller: 'StockDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    symbol: null,
                                    value: null,
                                    change: null,
                                    name: null,
                                    url: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('stock', null, { reload: true });
                    }, function() {
                        $state.go('stock');
                    })
                }]
            })
            .state('stock.edit', {
                parent: 'stock',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/stock/stock-dialog.html',
                        controller: 'StockDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Stock', function(Stock) {
                                return Stock.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('stock', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('stock.delete', {
                parent: 'stock',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/stock/stock-delete-dialog.html',
                        controller: 'StockDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Stock', function(Stock) {
                                return Stock.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('stock', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
