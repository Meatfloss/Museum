(function () {
  'use strict';

  angular
    .module('tianhuang.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.tianhuang', {
        abstract: true,
        url: '/tianhuang',
        template: '<ui-view/>'
      })
      .state('admin.tianhuang.list', {
        url: '',
        templateUrl: 'modules/tianhuang/client/views/admin/list-tianhuang.client.view.html',
        controller: 'TianhuangListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.tianhuang.create', {
        url: '/create',
        templateUrl: 'modules/tianhuang/client/views/admin/form-tianhuang.client.view.html',
        controller: 'TianhuangController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          tianhuangResolve: newPainting
        }
      })
      .state('admin.tianhuang.edit', {
        url: '/:tianhuangId/edit',
        templateUrl: 'modules/tianhuang/client/views/admin/form-tianhuang.client.view.html',
        controller: 'TianhuangController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          tianhuangResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'TianhuangService'];

  function getPainting($stateParams, TianhuangService) {
    return TianhuangService.get({
      tianhuangId: $stateParams.tianhuangId
    }).$promise;
  }

  newPainting.$inject = ['TianhuangService'];

  function newPainting(TianhuangService) {
    return new TianhuangService();
  }
}());
