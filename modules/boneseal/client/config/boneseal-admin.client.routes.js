(function () {
  'use strict';

  angular
    .module('boneseal.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.boneseal', {
        abstract: true,
        url: '/boneseal',
        template: '<ui-view/>'
      })
      .state('admin.boneseal.list', {
        url: '',
        templateUrl: 'modules/boneseal/client/views/admin/list-boneseal.client.view.html',
        controller: 'BonesealListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.boneseal.create', {
        url: '/create',
        templateUrl: 'modules/boneseal/client/views/admin/form-boneseal.client.view.html',
        controller: 'BonesealController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bonesealResolve: newPainting
        }
      })
      .state('admin.boneseal.edit', {
        url: '/:bonesealId/edit',
        templateUrl: 'modules/boneseal/client/views/admin/form-boneseal.client.view.html',
        controller: 'BonesealController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bonesealResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BonesealService'];

  function getPainting($stateParams, BonesealService) {
    return BonesealService.get({
      bonesealId: $stateParams.bonesealId
    }).$promise;
  }

  newPainting.$inject = ['BonesealService'];

  function newPainting(BonesealService) {
    return new BonesealService();
  }
}());
