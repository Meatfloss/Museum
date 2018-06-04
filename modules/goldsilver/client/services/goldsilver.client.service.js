(function () {
  'use strict';

  angular
    .module('goldsilver.services')
    .factory('GoldsilverService', GoldsilverService);

  GoldsilverService.$inject = ['$resource'];

  function GoldsilverService($resource) {
    var Goldsilver = $resource('api/goldsilver/:goldsilverId', {
      goldsilverId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Goldsilver.prototype, {
      createOrUpdate: function () {
        var goldsilver = this;
        return createOrUpdate(goldsilver);
      }
    });

    return Goldsilver;

    function createOrUpdate(goldsilver) {
      if (goldsilver._id) {
        return goldsilver.$update(onSuccess, onError);
      } else {
        return goldsilver.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(goldsilver) {
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
