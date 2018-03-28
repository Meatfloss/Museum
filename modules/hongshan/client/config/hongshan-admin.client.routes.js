(function () {
  'use strict';

  angular
    .module('hongshan.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.hongshan', {
        abstract: true,
        url: '/hongshan',
        template: '<ui-view/>'
      })
      .state('admin.hongshan.list', {
        url: '',
        templateUrl: 'modules/hongshan/client/views/admin/list-hongshan.client.view.html',
        controller: 'HongshanListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.hongshan.create', {
        url: '/create',
        templateUrl: 'modules/hongshan/client/views/admin/form-hongshan.client.view.html',
        controller: 'HongshanController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          hongshanResolve: newPainting
        }
      })
      .state('admin.hongshan.edit', {
        url: '/:hongshanId/edit',
        templateUrl: 'modules/hongshan/client/views/admin/form-hongshan.client.view.html',
        controller: 'HongshanController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          hongshanResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'HongshanService'];

  function getPainting($stateParams, HongshanService) {
    return HongshanService.get({
      hongshanId: $stateParams.hongshanId
    }).$promise;
  }

  newPainting.$inject = ['HongshanService'];

  function newPainting(HongshanService) {
    return new HongshanService();
  }
}());
