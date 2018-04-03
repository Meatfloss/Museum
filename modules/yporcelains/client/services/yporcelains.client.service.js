(function () {
  'use strict';

  angular
    .module('yporcelains.services')
    .factory('YporcelainsService', YporcelainsService);

  YporcelainsService.$inject = ['$resource'];

  function YporcelainsService($resource) {
    var Yporcelains = $resource('api/yporcelains/:yporcelainsId', {
      yporcelainsId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Yporcelains.prototype, {
      createOrUpdate: function () {
        var yporcelains = this;
        return createOrUpdate(yporcelains);
      }
    });

    return Yporcelains;

    function createOrUpdate(yporcelains) {
      if (yporcelains._id) {
        return yporcelains.$update(onSuccess, onError);
      } else {
        return yporcelains.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(yporcelains) {
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
