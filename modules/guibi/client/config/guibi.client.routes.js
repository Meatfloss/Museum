(function () {
  'use strict';

  angular
    .module('guibi.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('guibi', {
        abstract: true,
        url: '/guibi',
        template: '<ui-view/>'
      })
      .state('guibi.list', {
        url: '',
        templateUrl: 'modules/guibi/client/views/list-guibi.client.view.html',
        controller: 'GuibiListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Guibi List'
        }
      })
      .state('guibi.view', {
        url: '/:guibiId',
        templateUrl: 'modules/guibi/client/views/view-guibi.client.view.html',
        controller: 'GuibiController',
        controllerAs: 'vm',
        resolve: {
          guibiResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ guibiResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'GuibiService'];

  function getPainting($stateParams, GuibiService) {
    return GuibiService.get({
      guibiId: $stateParams.guibiId
    }).$promise;
  }
}());
