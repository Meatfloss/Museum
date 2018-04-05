(function () {
  'use strict';

  angular
    .module('crystal.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('crystal', {
        abstract: true,
        url: '/crystal',
        template: '<ui-view/>'
      })
      .state('crystal.list', {
        url: '',
        templateUrl: 'modules/crystal/client/views/list-crystal.client.view.html',
        controller: 'CrystalListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Crystal List'
        }
      })
      .state('crystal.view', {
        url: '/:crystalId',
        templateUrl: 'modules/crystal/client/views/view-crystal.client.view.html',
        controller: 'CrystalController',
        controllerAs: 'vm',
        resolve: {
          crystalResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ crystalResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'CrystalService'];

  function getPainting($stateParams, CrystalService) {
    return CrystalService.get({
      crystalId: $stateParams.crystalId
    }).$promise;
  }
}());
