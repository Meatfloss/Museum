(function () {
  'use strict';

  angular
    .module('lacquer.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.lacquer', {
        abstract: true,
        url: '/lacquer',
        template: '<ui-view/>'
      })
      .state('admin.lacquer.list', {
        url: '',
        templateUrl: 'modules/lacquer/client/views/admin/list-lacquer.client.view.html',
        controller: 'LacquerListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.lacquer.create', {
        url: '/create',
        templateUrl: 'modules/lacquer/client/views/admin/form-lacquer.client.view.html',
        controller: 'LacquerController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          lacquerResolve: newPainting
        }
      })
      .state('admin.lacquer.edit', {
        url: '/:lacquerId/edit',
        templateUrl: 'modules/lacquer/client/views/admin/form-lacquer.client.view.html',
        controller: 'LacquerController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          lacquerResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'LacquerService'];

  function getPainting($stateParams, LacquerService) {
    return LacquerService.get({
      lacquerId: $stateParams.lacquerId
    }).$promise;
  }

  newPainting.$inject = ['LacquerService'];

  function newPainting(LacquerService) {
    return new LacquerService();
  }
}());
