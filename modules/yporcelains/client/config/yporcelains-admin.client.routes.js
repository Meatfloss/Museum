(function () {
  'use strict';

  angular
    .module('yporcelains.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.yporcelains', {
        abstract: true,
        url: '/yporcelains',
        template: '<ui-view/>'
      })
      .state('admin.yporcelains.list', {
        url: '',
        templateUrl: 'modules/yporcelains/client/views/admin/list-yporcelains.client.view.html',
        controller: 'YporcelainsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.yporcelains.create', {
        url: '/create',
        templateUrl: 'modules/yporcelains/client/views/admin/form-yporcelains.client.view.html',
        controller: 'YporcelainsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          yporcelainsResolve: newPainting
        }
      })
      .state('admin.yporcelains.edit', {
        url: '/:yporcelainsId/edit',
        templateUrl: 'modules/yporcelains/client/views/admin/form-yporcelains.client.view.html',
        controller: 'YporcelainsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          yporcelainsResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'YporcelainsService'];

  function getPainting($stateParams, YporcelainsService) {
    return YporcelainsService.get({
      yporcelainsId: $stateParams.yporcelainsId
    }).$promise;
  }

  newPainting.$inject = ['YporcelainsService'];

  function newPainting(YporcelainsService) {
    return new YporcelainsService();
  }
}());
