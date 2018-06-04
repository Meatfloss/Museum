(function () {
  'use strict';

  angular
    .module('goldsilver.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('goldsilver', {
        abstract: true,
        url: '/goldsilver',
        template: '<ui-view/>'
      })
      .state('goldsilver.list', {
        url: '',
        templateUrl: 'modules/goldsilver/client/views/list-goldsilver.client.view.html',
        controller: 'GoldsilverListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Goldsilver List'
        }
      })
      .state('goldsilver.view', {
        url: '/:goldsilverId',
        templateUrl: 'modules/goldsilver/client/views/view-goldsilver.client.view.html',
        controller: 'GoldsilverController',
        controllerAs: 'vm',
        resolve: {
          goldsilverResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ goldsilverResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'GoldsilverService'];

  function getPainting($stateParams, GoldsilverService) {
    return GoldsilverService.get({
      goldsilverId: $stateParams.goldsilverId
    }).$promise;
  }
}());
