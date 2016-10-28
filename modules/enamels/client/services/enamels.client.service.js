(function () {
  'use strict';

  angular
    .module('enamels.services')
    .factory('EnamelsService', EnamelsService);

  EnamelsService.$inject = ['$resource'];

  function EnamelsService($resource) {
    var Enamel = $resource('api/enamels/:enamelId', {
      enamelId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Enamel.prototype, {
      createOrUpdate: function () {
        var enamel = this;
        return createOrUpdate(enamel);
      }
    });

    return Enamel;

    function createOrUpdate(enamel) {
      if (enamel._id) {
        return enamel.$update(onSuccess, onError);
      } else {
        return enamel.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(enamel) {
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
