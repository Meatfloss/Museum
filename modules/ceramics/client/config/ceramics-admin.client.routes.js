(function () {
  'use strict';

  angular
    .module('ceramics.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.ceramics', {
        abstract: true,
        url: '/ceramics',
        template: '<ui-view/>'
      })
      .state('admin.ceramics.list', {
        url: '',
        templateUrl: 'modules/ceramics/client/views/admin/list-ceramics.client.view.html',
        controller: 'CeramicsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.ceramics.create', {
        url: '/create',
        templateUrl: 'modules/ceramics/client/views/admin/form-ceramic.client.view.html',
        controller: 'CeramicsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          ceramicResolve: newPainting
        }
      })
      .state('admin.ceramics.edit', {
        url: '/:ceramicId/edit',
        templateUrl: 'modules/ceramics/client/views/admin/form-ceramic.client.view.html',
        controller: 'CeramicsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          ceramicResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'CeramicsService'];

  function getPainting($stateParams, CeramicsService) {
    return CeramicsService.get({
      ceramicId: $stateParams.ceramicId
    }).$promise;
  }

  newPainting.$inject = ['CeramicsService'];

  function newPainting(CeramicsService) {
    return new CeramicsService();
  }
}());
