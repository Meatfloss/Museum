(function () {
  'use strict';

  angular
    .module('teapots.services')
    .factory('TeapotsService', TeapotsService);

  TeapotsService.$inject = ['$resource'];

  function TeapotsService($resource) {
    var Teapot = $resource('api/teapots/:teapotId', {
      teapotId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Teapot.prototype, {
      createOrUpdate: function () {
        var teapot = this;
        return createOrUpdate(teapot);
      }
    });

    return Teapot;

    function createOrUpdate(teapot) {
      if (teapot._id) {
        return teapot.$update(onSuccess, onError);
      } else {
        return teapot.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(teapot) {
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
