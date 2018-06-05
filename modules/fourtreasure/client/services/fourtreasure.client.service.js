(function () {
  'use strict';

  angular
    .module('fourtreasure.services')
    .factory('FourtreasureService', FourtreasureService);

  FourtreasureService.$inject = ['$resource'];

  function FourtreasureService($resource) {
    var Fourtreasure = $resource('api/fourtreasure/:fourtreasureId', {
      fourtreasureId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Fourtreasure.prototype, {
      createOrUpdate: function () {
        var fourtreasure = this;
        return createOrUpdate(fourtreasure);
      }
    });

    return Fourtreasure;

    function createOrUpdate(fourtreasure) {
      if (fourtreasure._id) {
        return fourtreasure.$update(onSuccess, onError);
      } else {
        return fourtreasure.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(fourtreasure) {
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
