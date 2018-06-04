(function () {
  'use strict';

  angular
    .module('goldsilverware.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('goldsilverware', {
        abstract: true,
        url: '/goldsilverware',
        template: '<ui-view/>'
      })
      .state('goldsilverware.list', {
        url: '',
        templateUrl: 'modules/goldsilverware/client/views/list-goldsilverware.client.view.html',
        controller: 'GoldsilverwareListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Goldsilverware List'
        }
      })
      .state('goldsilverware.view', {
        url: '/:goldsilverwareId',
        templateUrl: 'modules/goldsilverware/client/views/view-goldsilverware.client.view.html',
        controller: 'GoldsilverwareController',
        controllerAs: 'vm',
        resolve: {
          goldsilverwareResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ goldsilverwareResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'GoldsilverwareService'];

  function getPainting($stateParams, GoldsilverwareService) {
    return GoldsilverwareService.get({
      goldsilverwareId: $stateParams.goldsilverwareId
    }).$promise;
  }
}());
