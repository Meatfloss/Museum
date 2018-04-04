(function () {
  'use strict';

  angular
    .module('glassware.services')
    .factory('GlasswareService', GlasswareService);

  GlasswareService.$inject = ['$resource'];

  function GlasswareService($resource) {
    var Glassware = $resource('api/glassware/:glasswareId', {
      glasswareId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Glassware.prototype, {
      createOrUpdate: function () {
        var glassware = this;
        return createOrUpdate(glassware);
      }
    });

    return Glassware;

    function createOrUpdate(glassware) {
      if (glassware._id) {
        return glassware.$update(onSuccess, onError);
      } else {
        return glassware.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(glassware) {
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
