(function () {
  'use strict';

  angular
    .module('bronzepainted.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('bronzepainted', {
        abstract: true,
        url: '/bronzepainted',
        template: '<ui-view/>'
      })
      .state('bronzepainted.list', {
        url: '',
        templateUrl: 'modules/bronzepainted/client/views/list-bronzepainted.client.view.html',
        controller: 'BronzepaintedListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Bronzepainted List'
        }
      })
      .state('bronzepainted.view', {
        url: '/:bronzepaintedId',
        templateUrl: 'modules/bronzepainted/client/views/view-bronzepainted.client.view.html',
        controller: 'BronzepaintedController',
        controllerAs: 'vm',
        resolve: {
          bronzepaintedResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ bronzepaintedResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BronzepaintedService'];

  function getPainting($stateParams, BronzepaintedService) {
    return BronzepaintedService.get({
      bronzepaintedId: $stateParams.bronzepaintedId
    }).$promise;
  }
}());
