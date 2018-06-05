(function () {
  'use strict';

  angular
    .module('currency.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('currency', {
        abstract: true,
        url: '/currency',
        template: '<ui-view/>'
      })
      .state('currency.list', {
        url: '',
        templateUrl: 'modules/currency/client/views/list-currency.client.view.html',
        controller: 'CurrencyListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Currency List'
        }
      })
      .state('currency.view', {
        url: '/:currencyId',
        templateUrl: 'modules/currency/client/views/view-currency.client.view.html',
        controller: 'CurrencyController',
        controllerAs: 'vm',
        resolve: {
          currencyResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ currencyResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'CurrencyService'];

  function getPainting($stateParams, CurrencyService) {
    return CurrencyService.get({
      currencyId: $stateParams.currencyId
    }).$promise;
  }
}());
