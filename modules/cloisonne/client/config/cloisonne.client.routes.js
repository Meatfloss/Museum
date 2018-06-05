(function () {
  'use strict';

  angular
    .module('cloisonne.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cloisonne', {
        abstract: true,
        url: '/cloisonne',
        template: '<ui-view/>'
      })
      .state('cloisonne.list', {
        url: '',
        templateUrl: 'modules/cloisonne/client/views/list-cloisonne.client.view.html',
        controller: 'CloisonneListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cloisonne List'
        }
      })
      .state('cloisonne.view', {
        url: '/:cloisonneId',
        templateUrl: 'modules/cloisonne/client/views/view-cloisonne.client.view.html',
        controller: 'CloisonneController',
        controllerAs: 'vm',
        resolve: {
          cloisonneResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ cloisonneResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'CloisonneService'];

  function getPainting($stateParams, CloisonneService) {
    return CloisonneService.get({
      cloisonneId: $stateParams.cloisonneId
    }).$promise;
  }
}());
