(function () {
  'use strict';

  angular
    .module('treasures.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('treasures', {
        abstract: true,
        url: '/treasures',
        template: '<ui-view/>'
      })
      .state('treasures.list', {
        url: '',
        templateUrl: 'modules/treasures/client/views/list-treasures.client.view.html',
        controller: 'TreasuresListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Treasures List'
        }
      })
      .state('treasures.view', {
        url: '/:treasuresId',
        templateUrl: 'modules/treasures/client/views/view-treasures.client.view.html',
        controller: 'TreasuresController',
        controllerAs: 'vm',
        resolve: {
          treasuresResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ treasuresResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'TreasuresService'];

  function getPainting($stateParams, TreasuresService) {
    return TreasuresService.get({
      treasuresId: $stateParams.treasuresId
    }).$promise;
  }
}());
