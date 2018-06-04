(function () {
  'use strict';

  angular
    .module('tianhuang.services')
    .factory('TianhuangService', TianhuangService);

  TianhuangService.$inject = ['$resource'];

  function TianhuangService($resource) {
    var Tianhuang = $resource('api/tianhuang/:tianhuangId', {
      tianhuangId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Tianhuang.prototype, {
      createOrUpdate: function () {
        var tianhuang = this;
        return createOrUpdate(tianhuang);
      }
    });

    return Tianhuang;

    function createOrUpdate(tianhuang) {
      if (tianhuang._id) {
        return tianhuang.$update(onSuccess, onError);
      } else {
        return tianhuang.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(tianhuang) {
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
