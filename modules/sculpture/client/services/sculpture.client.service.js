(function () {
  'use strict';

  angular
    .module('sculpture.services')
    .factory('SculptureService', SculptureService);

  SculptureService.$inject = ['$resource'];

  function SculptureService($resource) {
    var Sculpture = $resource('api/sculpture/:sculptureId', {
      sculptureId: '@_id'
    },
      { update: { method: 'PUT' } },
      { query: { method: 'GET', isArray: true } });

    angular.extend(Sculpture.prototype, {
      createOrUpdate: function () {
        var sculpture = this;
        return createOrUpdate(sculpture);
      }
    });

    return Sculpture;

    function createOrUpdate(sculpture) {
      if (sculpture._id) {
        return sculpture.$update(onSuccess, onError);
      } else {
        return sculpture.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(sculpture) {
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
