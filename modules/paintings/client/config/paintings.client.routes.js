(function () {
  'use strict';

  angular
    .module('paintings.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('paintings', {
        abstract: true,
        url: '/paintings',
        template: '<ui-view/>'
      })
      .state('paintings.list', {
        url: '',
        templateUrl: 'modules/paintings/client/views/list-paintings.client.view.html',
        controller: 'PaintingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Paintings List'
        }
      })
      .state('paintings.view', {
        url: '/:paintingId',
        templateUrl: 'modules/paintings/client/views/view-painting.client.view.html',
        controller: 'PaintingsController',
        controllerAs: 'vm',
        resolve: {
          paintingResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ paintingResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'PaintingsService'];

  function getPainting($stateParams, PaintingsService) {
    return PaintingsService.get({
      paintingId: $stateParams.paintingId
    }).$promise;
  }
}());
