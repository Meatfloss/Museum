(function () {
  'use strict';

  angular
    .module('familles.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.familles', {
        abstract: true,
        url: '/familles',
        template: '<ui-view/>'
      })
      .state('admin.familles.list', {
        url: '',
        templateUrl: 'modules/familles/client/views/admin/list-familles.client.view.html',
        controller: 'FamillesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.familles.create', {
        url: '/create',
        templateUrl: 'modules/familles/client/views/admin/form-famille.client.view.html',
        controller: 'FamillesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          familleResolve: newPainting,
        }
      })
      .state('admin.familles.edit', {
        url: '/:familleId/edit',
        templateUrl: 'modules/familles/client/views/admin/form-famille.client.view.html',
        controller: 'FamillesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          familleResolve: getPainting,
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'FamillesService'];

  function getPainting($stateParams, FamillesService) {
    return FamillesService.get({
      familleId: $stateParams.familleId
    }).$promise;
  }

  newPainting.$inject = ['FamillesService'];

  function newPainting(FamillesService) {
    return new FamillesService();
  }
}());
