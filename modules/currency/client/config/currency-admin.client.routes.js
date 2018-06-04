(function () {
  'use strict';

  angular
    .module('currency.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.currency', {
        abstract: true,
        url: '/currency',
        template: '<ui-view/>'
      })
      .state('admin.currency.list', {
        url: '',
        templateUrl: 'modules/currency/client/views/admin/list-currency.client.view.html',
        controller: 'CurrencyListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.currency.create', {
        url: '/create',
        templateUrl: 'modules/currency/client/views/admin/form-currency.client.view.html',
        controller: 'CurrencyController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          currencyResolve: newPainting
        }
      })
      .state('admin.currency.edit', {
        url: '/:currencyId/edit',
        templateUrl: 'modules/currency/client/views/admin/form-currency.client.view.html',
        controller: 'CurrencyController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          currencyResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'CurrencyService'];

  function getPainting($stateParams, CurrencyService) {
    return CurrencyService.get({
      currencyId: $stateParams.currencyId
    }).$promise;
  }

  newPainting.$inject = ['CurrencyService'];

  function newPainting(CurrencyService) {
    return new CurrencyService();
  }
}());
