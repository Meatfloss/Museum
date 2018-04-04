(function () {
  'use strict';

  angular
    .module('boneseal.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('boneseal', {
        abstract: true,
        url: '/boneseal',
        template: '<ui-view/>'
      })
      .state('boneseal.list', {
        url: '',
        templateUrl: 'modules/boneseal/client/views/list-boneseal.client.view.html',
        controller: 'BonesealListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Boneseal List'
        }
      })
      .state('boneseal.view', {
        url: '/:bonesealId',
        templateUrl: 'modules/boneseal/client/views/view-boneseal.client.view.html',
        controller: 'BonesealController',
        controllerAs: 'vm',
        resolve: {
          bonesealResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ bonesealResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BonesealService'];

  function getPainting($stateParams, BonesealService) {
    return BonesealService.get({
      bonesealId: $stateParams.bonesealId
    }).$promise;
  }
}());
