(function () {
  'use strict';

  angular
    .module('teapots.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.teapots', {
        abstract: true,
        url: '/teapots',
        template: '<ui-view/>'
      })
      .state('admin.teapots.list', {
        url: '',
        templateUrl: 'modules/teapots/client/views/admin/list-teapots.client.view.html',
        controller: 'TeapotsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.teapots.create', {
        url: '/create',
        templateUrl: 'modules/teapots/client/views/admin/form-teapot.client.view.html',
        controller: 'TeapotsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          teapotResolve: newPainting,
        }
      })
      .state('admin.teapots.edit', {
        url: '/:teapotId/edit',
        templateUrl: 'modules/teapots/client/views/admin/form-teapot.client.view.html',
        controller: 'TeapotsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          teapotResolve: getPainting,
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'TeapotsService'];

  function getPainting($stateParams, TeapotsService) {
    return TeapotsService.get({
      teapotId: $stateParams.teapotId
    }).$promise;
  }

  newPainting.$inject = ['TeapotsService'];

  function newPainting(TeapotsService) {
    return new TeapotsService();
  }
}());
