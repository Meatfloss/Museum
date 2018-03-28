(function () {
  'use strict';

  angular
    .module('qijia.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.qijia', {
        abstract: true,
        url: '/qijia',
        template: '<ui-view/>'
      })
      .state('admin.qijia.list', {
        url: '',
        templateUrl: 'modules/qijia/client/views/admin/list-qijia.client.view.html',
        controller: 'QijiaListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.qijia.create', {
        url: '/create',
        templateUrl: 'modules/qijia/client/views/admin/form-qijia.client.view.html',
        controller: 'QijiaController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          qijiaResolve: newPainting
        }
      })
      .state('admin.qijia.edit', {
        url: '/:qijiaId/edit',
        templateUrl: 'modules/qijia/client/views/admin/form-qijia.client.view.html',
        controller: 'QijiaController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          qijiaResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'QijiaService'];

  function getPainting($stateParams, QijiaService) {
    return QijiaService.get({
      qijiaId: $stateParams.qijiaId
    }).$promise;
  }

  newPainting.$inject = ['QijiaService'];

  function newPainting(QijiaService) {
    return new QijiaService();
  }
}());
