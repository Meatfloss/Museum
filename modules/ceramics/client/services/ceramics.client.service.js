(function () {
  'use strict';

  angular
    .module('ceramics.services')
    .factory('CeramicsService', CeramicsService);

  CeramicsService.$inject = ['$resource'];

  function CeramicsService($resource) {
    var Ceramic = $resource('api/ceramics/:ceramicId', {
      ceramicId: '@_id'
    },
      { update: { method: 'PUT' } },
      { query: { method: 'GET', isArray: true } });

    angular.extend(Ceramic.prototype, {
      createOrUpdate: function () {
        var ceramic = this;
        return createOrUpdate(ceramic);
      }
    });

    return Ceramic;

    function createOrUpdate(ceramic) {
      if (ceramic._id) {
        return ceramic.$update(onSuccess, onError);
      } else {
        return ceramic.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(ceramic) {
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
