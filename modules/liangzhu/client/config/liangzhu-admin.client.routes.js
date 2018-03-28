(function () {
  'use strict';

  angular
    .module('liangzhu.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.liangzhu', {
        abstract: true,
        url: '/liangzhu',
        template: '<ui-view/>'
      })
      .state('admin.liangzhu.list', {
        url: '',
        templateUrl: 'modules/liangzhu/client/views/admin/list-liangzhu.client.view.html',
        controller: 'LiangzhuListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.liangzhu.create', {
        url: '/create',
        templateUrl: 'modules/liangzhu/client/views/admin/form-liangzhu.client.view.html',
        controller: 'LiangzhuController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          liangzhuResolve: newPainting
        }
      })
      .state('admin.liangzhu.edit', {
        url: '/:liangzhuId/edit',
        templateUrl: 'modules/liangzhu/client/views/admin/form-liangzhu.client.view.html',
        controller: 'LiangzhuController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          liangzhuResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'LiangzhuService'];

  function getPainting($stateParams, LiangzhuService) {
    return LiangzhuService.get({
      liangzhuId: $stateParams.liangzhuId
    }).$promise;
  }

  newPainting.$inject = ['LiangzhuService'];

  function newPainting(LiangzhuService) {
    return new LiangzhuService();
  }
}());
