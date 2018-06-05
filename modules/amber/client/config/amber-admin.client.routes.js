(function () {
  'use strict';

  angular
    .module('amber.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.amber', {
        abstract: true,
        url: '/amber',
        template: '<ui-view/>'
      })
      .state('admin.amber.list', {
        url: '',
        templateUrl: 'modules/amber/client/views/admin/list-amber.client.view.html',
        controller: 'AmberListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.amber.create', {
        url: '/create',
        templateUrl: 'modules/amber/client/views/admin/form-amber.client.view.html',
        controller: 'AmberController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          amberResolve: newPainting
        }
      })
      .state('admin.amber.edit', {
        url: '/:amberId/edit',
        templateUrl: 'modules/amber/client/views/admin/form-amber.client.view.html',
        controller: 'AmberController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          amberResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'AmberService'];

  function getPainting($stateParams, AmberService) {
    return AmberService.get({
      amberId: $stateParams.amberId
    }).$promise;
  }

  newPainting.$inject = ['AmberService'];

  function newPainting(AmberService) {
    return new AmberService();
  }
}());
