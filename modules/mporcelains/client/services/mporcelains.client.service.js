(function () {
  'use strict';

  angular
    .module('mporcelains.services')
    .factory('MporcelainsService', MporcelainsService);

  MporcelainsService.$inject = ['$resource'];

  function MporcelainsService($resource) {
    var Mporcelains = $resource('api/mporcelains/:mporcelainsId', {
      mporcelainsId: '@_id'
    },
      { update: { method: 'PUT' } },
      { query: { method: 'GET', isArray: true } });

    angular.extend(Mporcelains.prototype, {
      createOrUpdate: function () {
        var mporcelains = this;
        return createOrUpdate(mporcelains);
      }
    });

    return Mporcelains;

    function createOrUpdate(mporcelains) {
      if (mporcelains._id) {
        return mporcelains.$update(onSuccess, onError);
      } else {
        return mporcelains.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(mporcelains) {
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
