(function () {
  'use strict';

  angular
    .module('treasures.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.treasures', {
        abstract: true,
        url: '/treasures',
        template: '<ui-view/>'
      })
      .state('admin.treasures.list', {
        url: '',
        templateUrl: 'modules/treasures/client/views/admin/list-treasures.client.view.html',
        controller: 'TreasuresListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.treasures.create', {
        url: '/create',
        templateUrl: 'modules/treasures/client/views/admin/form-treasures.client.view.html',
        controller: 'TreasuresController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          treasuresResolve: newPainting
        }
      })
      .state('admin.treasures.edit', {
        url: '/:treasuresId/edit',
        templateUrl: 'modules/treasures/client/views/admin/form-treasures.client.view.html',
        controller: 'TreasuresController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          treasuresResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'TreasuresService'];

  function getPainting($stateParams, TreasuresService) {
    return TreasuresService.get({
      treasuresId: $stateParams.treasuresId
    }).$promise;
  }

  newPainting.$inject = ['TreasuresService'];

  function newPainting(TreasuresService) {
    return new TreasuresService();
  }
}());
