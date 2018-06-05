(function () {
  'use strict';

  angular
    .module('amber.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('amber', {
        abstract: true,
        url: '/amber',
        template: '<ui-view/>'
      })
      .state('amber.list', {
        url: '',
        templateUrl: 'modules/amber/client/views/list-amber.client.view.html',
        controller: 'AmberListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Amber List'
        }
      })
      .state('amber.view', {
        url: '/:amberId',
        templateUrl: 'modules/amber/client/views/view-amber.client.view.html',
        controller: 'AmberController',
        controllerAs: 'vm',
        resolve: {
          amberResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ amberResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'AmberService'];

  function getPainting($stateParams, AmberService) {
    return AmberService.get({
      amberId: $stateParams.amberId
    }).$promise;
  }
}());
