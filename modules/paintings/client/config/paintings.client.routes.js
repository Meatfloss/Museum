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
      .state('paintings.landing', {
        url: '/landing',
        templateUrl: 'modules/paintings/client/views/landing-paintings.client.view.html',
        controller: 'PaintingsLandingController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Paintings List for Authors'
        },
        resolve: {
          authorsResolve: getAuthors
        }
      })
      .state('paintings.list', {
        url: '',
        templateUrl: 'modules/paintings/client/views/list-paintings.client.view.html',
        controller: 'PaintingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Paintings List'
        },
        resolve: {
          authorsResolve: getAuthors
        }
      })
      .state('paintings.view', {
        url: '/:paintingId',
        templateUrl: 'modules/paintings/client/views/view-painting.client.view.html',
        controller: 'PaintingsController',
        controllerAs: 'vm',
        resolve: {
          paintingResolve: getPainting,
          authorsResolve: getAuthors
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


  getAuthors.$inject = ['$stateParams', 'AuthorsService'];

  function getAuthors($stateParams, AuthorsService) {
    return AuthorsService.query().$promise;
  }
}());
