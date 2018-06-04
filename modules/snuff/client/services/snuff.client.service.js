(function () {
  'use strict';

  angular
    .module('snuff.services')
    .factory('SnuffService', SnuffService);

  SnuffService.$inject = ['$resource'];

  function SnuffService($resource) {
    var Snuff = $resource('api/snuff/:snuffId', {
      snuffId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Snuff.prototype, {
      createOrUpdate: function () {
        var snuff = this;
        return createOrUpdate(snuff);
      }
    });

    return Snuff;

    function createOrUpdate(snuff) {
      if (snuff._id) {
        return snuff.$update(onSuccess, onError);
      } else {
        return snuff.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(snuff) {
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
