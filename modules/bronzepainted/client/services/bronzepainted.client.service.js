(function () {
  'use strict';

  angular
    .module('bronzepainted.services')
    .factory('BronzepaintedService', BronzepaintedService);

  BronzepaintedService.$inject = ['$resource'];

  function BronzepaintedService($resource) {
    var Bronzepainted = $resource('api/bronzepainted/:bronzepaintedId', {
      bronzepaintedId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Bronzepainted.prototype, {
      createOrUpdate: function () {
        var bronzepainted = this;
        return createOrUpdate(bronzepainted);
      }
    });

    return Bronzepainted;

    function createOrUpdate(bronzepainted) {
      if (bronzepainted._id) {
        return bronzepainted.$update(onSuccess, onError);
      } else {
        return bronzepainted.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(bronzepainted) {
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
