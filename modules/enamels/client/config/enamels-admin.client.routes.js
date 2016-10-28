(function () {
  'use strict';

  angular
    .module('enamels.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.enamels', {
        abstract: true,
        url: '/enamels',
        template: '<ui-view/>'
      })
      .state('admin.enamels.list', {
        url: '',
        templateUrl: 'modules/enamels/client/views/admin/list-enamels.client.view.html',
        controller: 'EnamelsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.enamels.create', {
        url: '/create',
        templateUrl: 'modules/enamels/client/views/admin/form-enamel.client.view.html',
        controller: 'EnamelsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          enamelResolve: newPainting
        }
      })
      .state('admin.enamels.edit', {
        url: '/:enamelId/edit',
        templateUrl: 'modules/enamels/client/views/admin/form-enamel.client.view.html',
        controller: 'EnamelsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          enamelResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'EnamelsService'];

  function getPainting($stateParams, EnamelsService) {
    return EnamelsService.get({
      enamelId: $stateParams.enamelId
    }).$promise;
  }

  newPainting.$inject = ['EnamelsService'];

  function newPainting(EnamelsService) {
    return new EnamelsService();
  }
}());
