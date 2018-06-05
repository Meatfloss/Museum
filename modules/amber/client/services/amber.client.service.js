(function () {
  'use strict';

  angular
    .module('amber.services')
    .factory('AmberService', AmberService);

  AmberService.$inject = ['$resource'];

  function AmberService($resource) {
    var Amber = $resource('api/amber/:amberId', {
      amberId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Amber.prototype, {
      createOrUpdate: function () {
        var amber = this;
        return createOrUpdate(amber);
      }
    });

    return Amber;

    function createOrUpdate(amber) {
      if (amber._id) {
        return amber.$update(onSuccess, onError);
      } else {
        return amber.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(amber) {
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
