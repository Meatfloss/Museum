(function () {
  'use strict';

  angular
    .module('fourtreasure.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.fourtreasure', {
        abstract: true,
        url: '/fourtreasure',
        template: '<ui-view/>'
      })
      .state('admin.fourtreasure.list', {
        url: '',
        templateUrl: 'modules/fourtreasure/client/views/admin/list-fourtreasure.client.view.html',
        controller: 'FourtreasureListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.fourtreasure.create', {
        url: '/create',
        templateUrl: 'modules/fourtreasure/client/views/admin/form-fourtreasure.client.view.html',
        controller: 'FourtreasureController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          fourtreasureResolve: newPainting
        }
      })
      .state('admin.fourtreasure.edit', {
        url: '/:fourtreasureId/edit',
        templateUrl: 'modules/fourtreasure/client/views/admin/form-fourtreasure.client.view.html',
        controller: 'FourtreasureController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          fourtreasureResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'FourtreasureService'];

  function getPainting($stateParams, FourtreasureService) {
    return FourtreasureService.get({
      fourtreasureId: $stateParams.fourtreasureId
    }).$promise;
  }

  newPainting.$inject = ['FourtreasureService'];

  function newPainting(FourtreasureService) {
    return new FourtreasureService();
  }
}());
