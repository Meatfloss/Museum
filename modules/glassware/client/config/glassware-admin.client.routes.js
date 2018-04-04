(function () {
  'use strict';

  angular
    .module('glassware.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.glassware', {
        abstract: true,
        url: '/glassware',
        template: '<ui-view/>'
      })
      .state('admin.glassware.list', {
        url: '',
        templateUrl: 'modules/glassware/client/views/admin/list-glassware.client.view.html',
        controller: 'GlasswareListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.glassware.create', {
        url: '/create',
        templateUrl: 'modules/glassware/client/views/admin/form-glassware.client.view.html',
        controller: 'GlasswareController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          glasswareResolve: newPainting
        }
      })
      .state('admin.glassware.edit', {
        url: '/:glasswareId/edit',
        templateUrl: 'modules/glassware/client/views/admin/form-glassware.client.view.html',
        controller: 'GlasswareController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          glasswareResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'GlasswareService'];

  function getPainting($stateParams, GlasswareService) {
    return GlasswareService.get({
      glasswareId: $stateParams.glasswareId
    }).$promise;
  }

  newPainting.$inject = ['GlasswareService'];

  function newPainting(GlasswareService) {
    return new GlasswareService();
  }
}());
