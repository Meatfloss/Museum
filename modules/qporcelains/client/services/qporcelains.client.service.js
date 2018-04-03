(function () {
  'use strict';

  angular
    .module('qporcelains.services')
    .factory('QporcelainsService', QporcelainsService);

  QporcelainsService.$inject = ['$resource'];

  function QporcelainsService($resource) {
    var Qporcelains = $resource('api/qporcelains/:qporcelainsId', {
      qporcelainsId: '@_id'
    },
      { update: { method: 'PUT' } },
      { query: { method: 'GET', isArray: true } });

    angular.extend(Qporcelains.prototype, {
      createOrUpdate: function () {
        var qporcelains = this;
        return createOrUpdate(qporcelains);
      }
    });

    return Qporcelains;

    function createOrUpdate(qporcelains) {
      if (qporcelains._id) {
        return qporcelains.$update(onSuccess, onError);
      } else {
        return qporcelains.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(qporcelains) {
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
