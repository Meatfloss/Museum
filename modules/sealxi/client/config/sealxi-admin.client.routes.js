(function () {
  'use strict';

  angular
    .module('sealxi.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.sealxi', {
        abstract: true,
        url: '/sealxi',
        template: '<ui-view/>'
      })
      .state('admin.sealxi.list', {
        url: '',
        templateUrl: 'modules/sealxi/client/views/admin/list-sealxi.client.view.html',
        controller: 'SealxiListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.sealxi.create', {
        url: '/create',
        templateUrl: 'modules/sealxi/client/views/admin/form-sealxi.client.view.html',
        controller: 'SealxiController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          sealxiResolve: newPainting
        }
      })
      .state('admin.sealxi.edit', {
        url: '/:sealxiId/edit',
        templateUrl: 'modules/sealxi/client/views/admin/form-sealxi.client.view.html',
        controller: 'SealxiController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          sealxiResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'SealxiService'];

  function getPainting($stateParams, SealxiService) {
    return SealxiService.get({
      sealxiId: $stateParams.sealxiId
    }).$promise;
  }

  newPainting.$inject = ['SealxiService'];

  function newPainting(SealxiService) {
    return new SealxiService();
  }
}());
