(function () {
  'use strict';

  angular
    .module('longshan.services')
    .factory('LongshanService', LongshanService);

  LongshanService.$inject = ['$resource'];

  function LongshanService($resource) {
    var Longshan = $resource('api/longshan/:longshanId', {
      longshanId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Longshan.prototype, {
      createOrUpdate: function () {
        var longshan = this;
        return createOrUpdate(longshan);
      }
    });

    return Longshan;

    function createOrUpdate(longshan) {
      if (longshan._id) {
        return longshan.$update(onSuccess, onError);
      } else {
        return longshan.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(longshan) {
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
