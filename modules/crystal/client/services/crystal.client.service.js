(function () {
  'use strict';

  angular
    .module('crystal.services')
    .factory('CrystalService', CrystalService);

  CrystalService.$inject = ['$resource'];

  function CrystalService($resource) {
    var Crystal = $resource('api/crystal/:crystalId', {
      crystalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Crystal.prototype, {
      createOrUpdate: function () {
        var crystal = this;
        return createOrUpdate(crystal);
      }
    });

    return Crystal;

    function createOrUpdate(crystal) {
      if (crystal._id) {
        return crystal.$update(onSuccess, onError);
      } else {
        return crystal.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(crystal) {
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
