(function () {
  'use strict';

  angular
    .module('paintings.services')
    .factory('PaintingsService', PaintingsService);

  PaintingsService.$inject = ['$resource'];

  function PaintingsService($resource) {
    var Painting = $resource('api/paintings/:paintingId', {
      paintingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Painting.prototype, {
      createOrUpdate: function () {
        var painting = this;
        return createOrUpdate(painting);
      }
    });

    return Painting;

    function createOrUpdate(painting) {
      if (painting._id) {
        return painting.$update(onSuccess, onError);
      } else {
        return painting.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(painting) {
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
