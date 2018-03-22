(function () {
  'use strict';

  angular
    .module('longshan.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('longshan', {
        abstract: true,
        url: '/longshan',
        template: '<ui-view/>'
      })
      .state('longshan.list', {
        url: '',
        templateUrl: 'modules/longshan/client/views/list-longshan.client.view.html',
        controller: 'LongshanListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Longshan List'
        }
      })
      .state('longshan.view', {
        url: '/:longshanId',
        templateUrl: 'modules/longshan/client/views/view-longshan.client.view.html',
        controller: 'LongshanController',
        controllerAs: 'vm',
        resolve: {
          longshanResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ longshanResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'LongshanService'];

  function getPainting($stateParams, LongshanService) {
    return LongshanService.get({
      longshanId: $stateParams.longshanId
    }).$promise;
  }
}());
