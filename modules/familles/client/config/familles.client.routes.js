(function () {
  'use strict';

  angular
    .module('familles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('familles', {
        abstract: true,
        url: '/familles',
        template: '<ui-view/>'
      })
      .state('familles.list', {
        url: '',
        templateUrl: 'modules/familles/client/views/list-familles.client.view.html',
        controller: 'FamillesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Familles List'
        }
      })
      .state('familles.view', {
        url: '/:familleId',
        templateUrl: 'modules/familles/client/views/view-famille.client.view.html',
        controller: 'FamillesController',
        controllerAs: 'vm',
        resolve: {
          familleResolve: getPainting,
        },
        data: {
          pageTitle: 'Painting {{ familleResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'FamillesService'];

  function getPainting($stateParams, FamillesService) {
    return FamillesService.get({
      familleId: $stateParams.familleId
    }).$promise;
  }
}());
