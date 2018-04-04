(function () {
  'use strict';

  angular
    .module('bone.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('bone', {
        abstract: true,
        url: '/bone',
        template: '<ui-view/>'
      })
      .state('bone.list', {
        url: '',
        templateUrl: 'modules/bone/client/views/list-bone.client.view.html',
        controller: 'BoneListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Bone List'
        }
      })
      .state('bone.view', {
        url: '/:boneId',
        templateUrl: 'modules/bone/client/views/view-bone.client.view.html',
        controller: 'BoneController',
        controllerAs: 'vm',
        resolve: {
          boneResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ boneResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BoneService'];

  function getPainting($stateParams, BoneService) {
    return BoneService.get({
      boneId: $stateParams.boneId
    }).$promise;
  }
}());
