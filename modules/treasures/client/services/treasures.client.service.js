(function () {
  'use strict';

  angular
    .module('treasures.services')
    .factory('TreasuresService', TreasuresService);

  TreasuresService.$inject = ['$resource'];

  function TreasuresService($resource) {
    var Treasures = $resource('api/treasures/:treasuresId', {
      treasuresId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Treasures.prototype, {
      createOrUpdate: function () {
        var treasures = this;
        return createOrUpdate(treasures);
      }
    });

    return Treasures;

    function createOrUpdate(treasures) {
      if (treasures._id) {
        return treasures.$update(onSuccess, onError);
      } else {
        return treasures.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(treasures) {
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
