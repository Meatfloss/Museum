(function () {
  'use strict';

  angular
    .module('bronzepainted.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.bronzepainted', {
        abstract: true,
        url: '/bronzepainted',
        template: '<ui-view/>'
      })
      .state('admin.bronzepainted.list', {
        url: '',
        templateUrl: 'modules/bronzepainted/client/views/admin/list-bronzepainted.client.view.html',
        controller: 'BronzepaintedListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.bronzepainted.create', {
        url: '/create',
        templateUrl: 'modules/bronzepainted/client/views/admin/form-bronzepainted.client.view.html',
        controller: 'BronzepaintedController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bronzepaintedResolve: newPainting
        }
      })
      .state('admin.bronzepainted.edit', {
        url: '/:bronzepaintedId/edit',
        templateUrl: 'modules/bronzepainted/client/views/admin/form-bronzepainted.client.view.html',
        controller: 'BronzepaintedController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bronzepaintedResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BronzepaintedService'];

  function getPainting($stateParams, BronzepaintedService) {
    return BronzepaintedService.get({
      bronzepaintedId: $stateParams.bronzepaintedId
    }).$promise;
  }

  newPainting.$inject = ['BronzepaintedService'];

  function newPainting(BronzepaintedService) {
    return new BronzepaintedService();
  }
}());
