(function () {
  'use strict';

  angular
    .module('goldsilver.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.goldsilver', {
        abstract: true,
        url: '/goldsilver',
        template: '<ui-view/>'
      })
      .state('admin.goldsilver.list', {
        url: '',
        templateUrl: 'modules/goldsilver/client/views/admin/list-goldsilver.client.view.html',
        controller: 'GoldsilverListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.goldsilver.create', {
        url: '/create',
        templateUrl: 'modules/goldsilver/client/views/admin/form-goldsilver.client.view.html',
        controller: 'GoldsilverController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          goldsilverResolve: newPainting
        }
      })
      .state('admin.goldsilver.edit', {
        url: '/:goldsilverId/edit',
        templateUrl: 'modules/goldsilver/client/views/admin/form-goldsilver.client.view.html',
        controller: 'GoldsilverController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          goldsilverResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'GoldsilverService'];

  function getPainting($stateParams, GoldsilverService) {
    return GoldsilverService.get({
      goldsilverId: $stateParams.goldsilverId
    }).$promise;
  }

  newPainting.$inject = ['GoldsilverService'];

  function newPainting(GoldsilverService) {
    return new GoldsilverService();
  }
}());
