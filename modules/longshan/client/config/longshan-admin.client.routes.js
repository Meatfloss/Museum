(function () {
  'use strict';

  angular
    .module('longshan.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.longshan', {
        abstract: true,
        url: '/longshan',
        template: '<ui-view/>'
      })
      .state('admin.longshan.list', {
        url: '',
        templateUrl: 'modules/longshan/client/views/admin/list-longshan.client.view.html',
        controller: 'LongshanListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.longshan.create', {
        url: '/create',
        templateUrl: 'modules/longshan/client/views/admin/form-longshan.client.view.html',
        controller: 'LongshanController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          longshanResolve: newPainting
        }
      })
      .state('admin.longshan.edit', {
        url: '/:longshanId/edit',
        templateUrl: 'modules/longshan/client/views/admin/form-longshan.client.view.html',
        controller: 'LongshanController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          longshanResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'LongshanService'];

  function getPainting($stateParams, LongshanService) {
    return LongshanService.get({
      longshanId: $stateParams.longshanId
    }).$promise;
  }

  newPainting.$inject = ['LongshanService'];

  function newPainting(LongshanService) {
    return new LongshanService();
  }
}());
