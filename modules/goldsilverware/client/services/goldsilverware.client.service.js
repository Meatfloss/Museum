(function () {
  'use strict';

  angular
    .module('goldsilverware.services')
    .factory('GoldsilverwareService', GoldsilverwareService);

  GoldsilverwareService.$inject = ['$resource'];

  function GoldsilverwareService($resource) {
    var Goldsilverware = $resource('api/goldsilverware/:goldsilverwareId', {
      goldsilverwareId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Goldsilverware.prototype, {
      createOrUpdate: function () {
        var goldsilverware = this;
        return createOrUpdate(goldsilverware);
      }
    });

    return Goldsilverware;

    function createOrUpdate(goldsilverware) {
      if (goldsilverware._id) {
        return goldsilverware.$update(onSuccess, onError);
      } else {
        return goldsilverware.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(goldsilverware) {
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
