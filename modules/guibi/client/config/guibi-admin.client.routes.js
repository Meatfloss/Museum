(function () {
  'use strict';

  angular
    .module('guibi.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.guibi', {
        abstract: true,
        url: '/guibi',
        template: '<ui-view/>'
      })
      .state('admin.guibi.list', {
        url: '',
        templateUrl: 'modules/guibi/client/views/admin/list-guibi.client.view.html',
        controller: 'GuibiListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.guibi.create', {
        url: '/create',
        templateUrl: 'modules/guibi/client/views/admin/form-guibi.client.view.html',
        controller: 'GuibiController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          guibiResolve: newPainting
        }
      })
      .state('admin.guibi.edit', {
        url: '/:guibiId/edit',
        templateUrl: 'modules/guibi/client/views/admin/form-guibi.client.view.html',
        controller: 'GuibiController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          guibiResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'GuibiService'];

  function getPainting($stateParams, GuibiService) {
    return GuibiService.get({
      guibiId: $stateParams.guibiId
    }).$promise;
  }

  newPainting.$inject = ['GuibiService'];

  function newPainting(GuibiService) {
    return new GuibiService();
  }
}());
