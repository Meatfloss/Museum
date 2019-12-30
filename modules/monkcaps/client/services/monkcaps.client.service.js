(function () {
  'use strict';

  angular
    .module('monkcaps.services')
    .factory('MonkcapsService', MonkcapsService);

  MonkcapsService.$inject = ['$resource'];

  function MonkcapsService($resource) {
    var Monkcap = $resource('api/monkcaps/:monkcapId', {
      monkcapId: '@_id'
    },
      { update: { method: 'PUT' } },
      { query: { method: 'GET', isArray: true } });

    angular.extend(Monkcap.prototype, {
      createOrUpdate: function () {
        var monkcap = this;
        return createOrUpdate(monkcap);
      }
    });

    return Monkcap;

    function createOrUpdate(monkcap) {
      if (monkcap._id) {
        return monkcap.$update(onSuccess, onError);
      } else {
        return monkcap.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(monkcap) {
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
