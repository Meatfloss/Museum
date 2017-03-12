(function () {
  'use strict';

  angular
    .module('authors.services')
    .factory('AuthorPaintingsService', AuthorPaintingsService);

  AuthorPaintingsService.$inject = ['$resource'];

  function AuthorPaintingsService($resource) {
    var Author = $resource('api/paintings/byauthor/:authorId',
    { authorId: '@_id' },
    { query: { method: 'GET', isArray: true } });

    angular.extend(Author.prototype, {
      createOrUpdate: function () {
        var author = this;
        return createOrUpdate(author);
      }
    });

    return Author;

    function createOrUpdate(author) {
      if (author._id) {
        return author.$update(onSuccess, onError);
      } else {
        return author.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(author) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
