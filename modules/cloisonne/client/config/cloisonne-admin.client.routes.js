(function () {
  'use strict';

  angular
    .module('cloisonne.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.cloisonne', {
        abstract: true,
        url: '/cloisonne',
        template: '<ui-view/>'
      })
      .state('admin.cloisonne.list', {
        url: '',
        templateUrl: 'modules/cloisonne/client/views/admin/list-cloisonne.client.view.html',
        controller: 'CloisonneListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.cloisonne.create', {
        url: '/create',
        templateUrl: 'modules/cloisonne/client/views/admin/form-cloisonne.client.view.html',
        controller: 'CloisonneController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          cloisonneResolve: newPainting
        }
      })
      .state('admin.cloisonne.edit', {
        url: '/:cloisonneId/edit',
        templateUrl: 'modules/cloisonne/client/views/admin/form-cloisonne.client.view.html',
        controller: 'CloisonneController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          cloisonneResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'CloisonneService'];

  function getPainting($stateParams, CloisonneService) {
    return CloisonneService.get({
      cloisonneId: $stateParams.cloisonneId
    }).$promise;
  }

  newPainting.$inject = ['CloisonneService'];

  function newPainting(CloisonneService) {
    return new CloisonneService();
  }
}());
