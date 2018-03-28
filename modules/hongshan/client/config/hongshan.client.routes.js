(function () {
  'use strict';

  angular
    .module('hongshan.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('hongshan', {
        abstract: true,
        url: '/hongshan',
        template: '<ui-view/>'
      })
      .state('hongshan.list', {
        url: '',
        templateUrl: 'modules/hongshan/client/views/list-hongshan.client.view.html',
        controller: 'HongshanListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Hongshan List'
        }
      })
      .state('hongshan.view', {
        url: '/:hongshanId',
        templateUrl: 'modules/hongshan/client/views/view-hongshan.client.view.html',
        controller: 'HongshanController',
        controllerAs: 'vm',
        resolve: {
          hongshanResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ hongshanResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'HongshanService'];

  function getPainting($stateParams, HongshanService) {
    return HongshanService.get({
      hongshanId: $stateParams.hongshanId
    }).$promise;
  }
}());
