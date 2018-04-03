(function () {
  'use strict';

  angular
    .module('sword.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.sword', {
        abstract: true,
        url: '/sword',
        template: '<ui-view/>'
      })
      .state('admin.sword.list', {
        url: '',
        templateUrl: 'modules/sword/client/views/admin/list-sword.client.view.html',
        controller: 'SwordListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.sword.create', {
        url: '/create',
        templateUrl: 'modules/sword/client/views/admin/form-sword.client.view.html',
        controller: 'SwordController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          swordResolve: newPainting
        }
      })
      .state('admin.sword.edit', {
        url: '/:swordId/edit',
        templateUrl: 'modules/sword/client/views/admin/form-sword.client.view.html',
        controller: 'SwordController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          swordResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'SwordService'];

  function getPainting($stateParams, SwordService) {
    return SwordService.get({
      swordId: $stateParams.swordId
    }).$promise;
  }

  newPainting.$inject = ['SwordService'];

  function newPainting(SwordService) {
    return new SwordService();
  }
}());
