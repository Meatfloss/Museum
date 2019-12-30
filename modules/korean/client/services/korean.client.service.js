(function () {
  'use strict';

  angular
    .module('korean.services')
    .factory('KoreanService', KoreanService);

  KoreanService.$inject = ['$resource'];

  function KoreanService($resource) {
    var Korean = $resource('api/korean/:koreanId', {
      koreanId: '@_id'
    },
      { update: { method: 'PUT' } },
      { query: { method: 'GET', isArray: true } });

    angular.extend(Korean.prototype, {
      createOrUpdate: function () {
        var korean = this;
        return createOrUpdate(korean);
      }
    });

    return Korean;

    function createOrUpdate(korean) {
      if (korean._id) {
        return korean.$update(onSuccess, onError);
      } else {
        return korean.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(korean) {
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
