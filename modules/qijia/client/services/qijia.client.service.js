(function () {
  'use strict';

  angular
    .module('qijia.services')
    .factory('QijiaService', QijiaService);

  QijiaService.$inject = ['$resource'];

  function QijiaService($resource) {
    var Qijia = $resource('api/qijia/:qijiaId', {
      qijiaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Qijia.prototype, {
      createOrUpdate: function () {
        var qijia = this;
        return createOrUpdate(qijia);
      }
    });

    return Qijia;

    function createOrUpdate(qijia) {
      if (qijia._id) {
        return qijia.$update(onSuccess, onError);
      } else {
        return qijia.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(qijia) {
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
