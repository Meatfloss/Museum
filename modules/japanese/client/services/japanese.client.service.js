(function () {
  'use strict';

  angular
    .module('japanese.services')
    .factory('JapaneseService', JapaneseService);

  JapaneseService.$inject = ['$resource'];

  function JapaneseService($resource) {
    var Japanese = $resource('api/japanese/:japaneseId', {
      japaneseId: '@_id'
    },
      { update: { method: 'PUT' } },
      { query: { method: 'GET', isArray: true } });

    angular.extend(Japanese.prototype, {
      createOrUpdate: function () {
        var japanese = this;
        return createOrUpdate(japanese);
      }
    });

    return Japanese;

    function createOrUpdate(japanese) {
      if (japanese._id) {
        return japanese.$update(onSuccess, onError);
      } else {
        return japanese.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(japanese) {
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
