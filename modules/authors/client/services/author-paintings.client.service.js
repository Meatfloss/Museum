(function () {
  'use strict';

  angular
    .module('authors.services')
    .factory('AuthorPaintingsService', AuthorPaintingsService);

  AuthorPaintingsService.$inject = ['$resource'];

  function AuthorPaintingsService($resource) {
    var Authors = $resource('api/paintings/byauthor/:authorId',
    { authorId: '@_id' },
    { query: { method: 'GET', isArray: true } });

    return Authors;
  }
}());
