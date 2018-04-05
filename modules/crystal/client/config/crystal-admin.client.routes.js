(function () {
  'use strict';

  angular
    .module('crystal.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.crystal', {
        abstract: true,
        url: '/crystal',
        template: '<ui-view/>'
      })
      .state('admin.crystal.list', {
        url: '',
        templateUrl: 'modules/crystal/client/views/admin/list-crystal.client.view.html',
        controller: 'CrystalListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.crystal.create', {
        url: '/create',
        templateUrl: 'modules/crystal/client/views/admin/form-crystal.client.view.html',
        controller: 'CrystalController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          crystalResolve: newPainting
        }
      })
      .state('admin.crystal.edit', {
        url: '/:crystalId/edit',
        templateUrl: 'modules/crystal/client/views/admin/form-crystal.client.view.html',
        controller: 'CrystalController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          crystalResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'CrystalService'];

  function getPainting($stateParams, CrystalService) {
    return CrystalService.get({
      crystalId: $stateParams.crystalId
    }).$promise;
  }

  newPainting.$inject = ['CrystalService'];

  function newPainting(CrystalService) {
    return new CrystalService();
  }
}());
