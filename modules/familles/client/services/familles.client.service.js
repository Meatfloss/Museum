(function () {
  'use strict';

  angular
    .module('familles.services')
    .factory('FamillesService', FamillesService);

  FamillesService.$inject = ['$resource'];

  function FamillesService($resource) {
    var Famille = $resource('api/familles/:familleId', {
      familleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Famille.prototype, {
      createOrUpdate: function () {
        var famille = this;
        return createOrUpdate(famille);
      }
    });

    return Famille;

    function createOrUpdate(famille) {
      if (famille._id) {
        return famille.$update(onSuccess, onError);
      } else {
        return famille.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(famille) {
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
