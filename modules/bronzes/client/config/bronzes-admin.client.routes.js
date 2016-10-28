(function () {
  'use strict';

  angular
    .module('bronzes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.bronzes', {
        abstract: true,
        url: '/bronzes',
        template: '<ui-view/>'
      })
      .state('admin.bronzes.list', {
        url: '',
        templateUrl: 'modules/bronzes/client/views/admin/list-bronzes.client.view.html',
        controller: 'BronzesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.bronzes.create', {
        url: '/create',
        templateUrl: 'modules/bronzes/client/views/admin/form-bronze.client.view.html',
        controller: 'BronzesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bronzeResolve: newPainting
        }
      })
      .state('admin.bronzes.edit', {
        url: '/:bronzeId/edit',
        templateUrl: 'modules/bronzes/client/views/admin/form-bronze.client.view.html',
        controller: 'BronzesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bronzeResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BronzesService'];

  function getPainting($stateParams, BronzesService) {
    return BronzesService.get({
      bronzeId: $stateParams.bronzeId
    }).$promise;
  }

  newPainting.$inject = ['BronzesService'];

  function newPainting(BronzesService) {
    return new BronzesService();
  }
}());
