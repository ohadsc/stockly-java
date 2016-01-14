'use strict';

angular.module('stocklyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('transaction', {
                parent: 'entity',
                url: '/transactions',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Transactions'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/transaction/transactions.html',
                        controller: 'TransactionController'
                    }
                },
                resolve: {
                }
            })
            .state('transaction.detail', {
                parent: 'entity',
                url: '/transaction/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Transaction'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/transaction/transaction-detail.html',
                        controller: 'TransactionDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Transaction', function($stateParams, Transaction) {
                        return Transaction.get({id : $stateParams.id});
                    }]
                }
            })
            .state('transaction.new', {
                parent: 'transaction',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/transaction/transaction-dialog.html',
                        controller: 'TransactionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    type: null,
                                    price: null,
                                    date: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('transaction', null, { reload: true });
                    }, function() {
                        $state.go('transaction');
                    })
                }]
            })
            .state('transaction.edit', {
                parent: 'transaction',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/transaction/transaction-dialog.html',
                        controller: 'TransactionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Transaction', function(Transaction) {
                                return Transaction.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('transaction', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('transaction.delete', {
                parent: 'transaction',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/transaction/transaction-delete-dialog.html',
                        controller: 'TransactionDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Transaction', function(Transaction) {
                                return Transaction.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('transaction', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
