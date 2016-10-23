(function () {
  'use strict';

  angular
    .module('paintings.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.paintings', {
        abstract: true,
        url: '/paintings',
        template: '<ui-view/>'
      })
      .state('admin.paintings.list', {
        url: '',
        templateUrl: 'modules/paintings/client/views/admin/list-paintings.client.view.html',
        controller: 'PaintingsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
       resolve: {
          authorsResolve: getAuthors
        }
      })
      .state('admin.paintings.create', {
        url: '/create',
        templateUrl: 'modules/paintings/client/views/admin/form-painting.client.view.html',
        controller: 'PaintingsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          paintingResolve: newPainting,
          authorsResolve: getAuthors
        }
      })
      .state('admin.paintings.edit', {
        url: '/:paintingId/edit',
        templateUrl: 'modules/paintings/client/views/admin/form-painting.client.view.html',
        controller: 'PaintingsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          paintingResolve: getPainting,
          authorsResolve: getAuthors
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

  newPainting.$inject = ['PaintingsService'];

  function newPainting(PaintingsService) {
    return new PaintingsService();
  }
} ());
