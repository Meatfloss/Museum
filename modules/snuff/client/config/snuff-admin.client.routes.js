(function () {
  'use strict';

  angular
    .module('snuff.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.snuff', {
        abstract: true,
        url: '/snuff',
        template: '<ui-view/>'
      })
      .state('admin.snuff.list', {
        url: '',
        templateUrl: 'modules/snuff/client/views/admin/list-snuff.client.view.html',
        controller: 'SnuffListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.snuff.create', {
        url: '/create',
        templateUrl: 'modules/snuff/client/views/admin/form-snuff.client.view.html',
        controller: 'SnuffController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          snuffResolve: newPainting
        }
      })
      .state('admin.snuff.edit', {
        url: '/:snuffId/edit',
        templateUrl: 'modules/snuff/client/views/admin/form-snuff.client.view.html',
        controller: 'SnuffController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          snuffResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'SnuffService'];

  function getPainting($stateParams, SnuffService) {
    return SnuffService.get({
      snuffId: $stateParams.snuffId
    }).$promise;
  }

  newPainting.$inject = ['SnuffService'];

  function newPainting(SnuffService) {
    return new SnuffService();
  }
}());
