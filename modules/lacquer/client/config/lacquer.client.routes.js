(function () {
  'use strict';

  angular
    .module('lacquer.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('lacquer', {
        abstract: true,
        url: '/lacquer',
        template: '<ui-view/>'
      })
      .state('lacquer.list', {
        url: '',
        templateUrl: 'modules/lacquer/client/views/list-lacquer.client.view.html',
        controller: 'LacquerListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Lacquer List'
        }
      })
      .state('lacquer.view', {
        url: '/:lacquerId',
        templateUrl: 'modules/lacquer/client/views/view-lacquer.client.view.html',
        controller: 'LacquerController',
        controllerAs: 'vm',
        resolve: {
          lacquerResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ lacquerResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'LacquerService'];

  function getPainting($stateParams, LacquerService) {
    return LacquerService.get({
      lacquerId: $stateParams.lacquerId
    }).$promise;
  }
}());
