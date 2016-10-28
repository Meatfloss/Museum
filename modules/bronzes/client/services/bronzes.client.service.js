(function () {
  'use strict';

  angular
    .module('bronzes.services')
    .factory('BronzesService', BronzesService);

  BronzesService.$inject = ['$resource'];

  function BronzesService($resource) {
    var Bronze = $resource('api/bronzes/:bronzeId', {
      bronzeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Bronze.prototype, {
      createOrUpdate: function () {
        var bronze = this;
        return createOrUpdate(bronze);
      }
    });

    return Bronze;

    function createOrUpdate(bronze) {
      if (bronze._id) {
        return bronze.$update(onSuccess, onError);
      } else {
        return bronze.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(bronze) {
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
