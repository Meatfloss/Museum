(function () {
  'use strict';

  angular
    .module('authors.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('authors', {
        abstract: true,
        url: '/authors',
        template: '<ui-view/>'
      })
      .state('authors.view', {
        url: '/:authorId',
        templateUrl: 'modules/authors/client/views/author.client.view.html',
        controller: 'AuthorPaintingsController',
        controllerAs: 'vm',
        resolve: {
          authorResolve: getAuthor,
          paintingResolve: getPaintings
        },
        data: {
          pageTitle: 'Author {{ authorResolve.name }}'
        }
      });
  }

  getAuthor.$inject = ['$stateParams', 'AuthorsService'];

  function getAuthor($stateParams, AuthorsService) {
    return AuthorsService.get({
      authorId: $stateParams.authorId
    }).$promise;
  }

  //getPainting.$inject = ['$stateParams', 'PaintingsService'];

  //function getPainting($stateParams, PaintingsService) {
    //return PaintingsService.get({
      //paintingId: $stateParams.paintingId
    //}).$promise;
  //}

   getPaintings.$inject = ['$stateParams', 'AuthorPaintingsService'];

  function getPaintings($stateParams, AuthorPaintingsService) {
    return AuthorPaintingsService.query({authorId : $stateParams.authorId}).$promise;
  }
}());
