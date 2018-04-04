(function () {
  'use strict';

  angular
    .module('bone.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.bone', {
        abstract: true,
        url: '/bone',
        template: '<ui-view/>'
      })
      .state('admin.bone.list', {
        url: '',
        templateUrl: 'modules/bone/client/views/admin/list-bone.client.view.html',
        controller: 'BoneListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.bone.create', {
        url: '/create',
        templateUrl: 'modules/bone/client/views/admin/form-bone.client.view.html',
        controller: 'BoneController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          boneResolve: newPainting
        }
      })
      .state('admin.bone.edit', {
        url: '/:boneId/edit',
        templateUrl: 'modules/bone/client/views/admin/form-bone.client.view.html',
        controller: 'BoneController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          boneResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BoneService'];

  function getPainting($stateParams, BoneService) {
    return BoneService.get({
      boneId: $stateParams.boneId
    }).$promise;
  }

  newPainting.$inject = ['BoneService'];

  function newPainting(BoneService) {
    return new BoneService();
  }
}());
