(function () {
  'use strict';

  angular
    .module('jade.services')
    .factory('JadeService', JadeService);

  JadeService.$inject = ['$resource'];

  function JadeService($resource) {
    var Jade = $resource('api/jade/:jadeId', {
      jadeId: '@_id'
    },
      { update: { method: 'PUT' } },
      { query: { method: 'GET', isArray: true } });

    angular.extend(Jade.prototype, {
      createOrUpdate: function () {
        var jade = this;
        return createOrUpdate(jade);
      }
    });

    return Jade;

    function createOrUpdate(jade) {
      if (jade._id) {
        return jade.$update(onSuccess, onError);
      } else {
        return jade.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(jade) {
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
