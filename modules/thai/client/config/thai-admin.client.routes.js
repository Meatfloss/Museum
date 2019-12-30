(function () {
  'use strict';

  angular
    .module('thai.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.thai', {
        abstract: true,
        url: '/thai',
        template: '<ui-view/>'
      })
      .state('admin.thai.list', {
        url: '',
        templateUrl: 'modules/thai/client/views/admin/list-thai.client.view.html',
        controller: 'ThaiListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.thai.create', {
        url: '/create',
        templateUrl: 'modules/thai/client/views/admin/form-thai.client.view.html',
        controller: 'ThaiController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          thaiResolve: newPainting
        }
      })
      .state('admin.thai.edit', {
        url: '/:thaiId/edit',
        templateUrl: 'modules/thai/client/views/admin/form-thai.client.view.html',
        controller: 'ThaiController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          thaiResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'ThaiService'];

  function getPainting($stateParams, ThaiService) {
    return ThaiService.get({
      thaiId: $stateParams.thaiId
    }).$promise;
  }

  newPainting.$inject = ['ThaiService'];

  function newPainting(ThaiService) {
    return new ThaiService();
  }
}());
