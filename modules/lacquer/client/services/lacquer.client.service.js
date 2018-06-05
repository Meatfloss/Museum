(function () {
  'use strict';

  angular
    .module('lacquer.services')
    .factory('LacquerService', LacquerService);

  LacquerService.$inject = ['$resource'];

  function LacquerService($resource) {
    var Lacquer = $resource('api/lacquer/:lacquerId', {
      lacquerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Lacquer.prototype, {
      createOrUpdate: function () {
        var lacquer = this;
        return createOrUpdate(lacquer);
      }
    });

    return Lacquer;

    function createOrUpdate(lacquer) {
      if (lacquer._id) {
        return lacquer.$update(onSuccess, onError);
      } else {
        return lacquer.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(lacquer) {
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
