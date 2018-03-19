(function () {
  'use strict';

  angular
    .module('hongshan.services')
    .factory('HongshanService', HongshanService);

  HongshanService.$inject = ['$resource'];

  function HongshanService($resource) {
    var Hongshan = $resource('api/hongshan/:hongshanId', {
      hongshanId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Hongshan.prototype, {
      createOrUpdate: function () {
        var hongshan = this;
        return createOrUpdate(hongshan);
      }
    });

    return Hongshan;

    function createOrUpdate(hongshan) {
      if (hongshan._id) {
        return hongshan.$update(onSuccess, onError);
      } else {
        return hongshan.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(hongshan) {
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
