(function () {
  'use strict';

  angular
    .module('goldsilverware.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.goldsilverware', {
        abstract: true,
        url: '/goldsilverware',
        template: '<ui-view/>'
      })
      .state('admin.goldsilverware.list', {
        url: '',
        templateUrl: 'modules/goldsilverware/client/views/admin/list-goldsilverware.client.view.html',
        controller: 'GoldsilverwareListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.goldsilverware.create', {
        url: '/create',
        templateUrl: 'modules/goldsilverware/client/views/admin/form-goldsilverware.client.view.html',
        controller: 'GoldsilverwareController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          goldsilverwareResolve: newPainting
        }
      })
      .state('admin.goldsilverware.edit', {
        url: '/:goldsilverwareId/edit',
        templateUrl: 'modules/goldsilverware/client/views/admin/form-goldsilverware.client.view.html',
        controller: 'GoldsilverwareController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          goldsilverwareResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'GoldsilverwareService'];

  function getPainting($stateParams, GoldsilverwareService) {
    return GoldsilverwareService.get({
      goldsilverwareId: $stateParams.goldsilverwareId
    }).$promise;
  }

  newPainting.$inject = ['GoldsilverwareService'];

  function newPainting(GoldsilverwareService) {
    return new GoldsilverwareService();
  }
}());
