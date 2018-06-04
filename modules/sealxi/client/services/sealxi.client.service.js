(function () {
  'use strict';

  angular
    .module('sealxi.services')
    .factory('SealxiService', SealxiService);

  SealxiService.$inject = ['$resource'];

  function SealxiService($resource) {
    var Sealxi = $resource('api/sealxi/:sealxiId', {
      sealxiId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Sealxi.prototype, {
      createOrUpdate: function () {
        var sealxi = this;
        return createOrUpdate(sealxi);
      }
    });

    return Sealxi;

    function createOrUpdate(sealxi) {
      if (sealxi._id) {
        return sealxi.$update(onSuccess, onError);
      } else {
        return sealxi.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(sealxi) {
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
