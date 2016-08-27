(function () {
  'use strict';

  angular
    .module('authors.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.authors', {
        abstract: true,
        url: '/authors',
        template: '<ui-view/>'
      })
      .state('admin.authors.list', {
        url: '',
        templateUrl: 'modules/authors/client/views/admin/list-authors.client.view.html',
        controller: 'AuthorsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.authors.create', {
        url: '/create',
        templateUrl: 'modules/authors/client/views/admin/form-author.client.view.html',
        controller: 'AuthorsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          authorResolve: newAuthor
        }
      })
      .state('admin.authors.edit', {
        url: '/:authorId/edit',
        templateUrl: 'modules/authors/client/views/admin/form-author.client.view.html',
        controller: 'AuthorsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          authorResolve: getAuthor
        }
      });
  }

  getAuthor.$inject = ['$stateParams', 'AuthorsService'];

  function getAuthor($stateParams, AuthorsService) {
    return AuthorsService.get({
      authorId: $stateParams.authorId
    }).$promise;
  }

  newAuthor.$inject = ['AuthorsService'];

  function newAuthor(AuthorsService) {
    return new AuthorsService();
  }
}());
