(function () {
  'use strict';

  angular
    .module('boneseal.services')
    .factory('BonesealService', BonesealService);

  BonesealService.$inject = ['$resource'];

  function BonesealService($resource) {
    var Boneseal = $resource('api/boneseal/:bonesealId', {
      bonesealId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Boneseal.prototype, {
      createOrUpdate: function () {
        var boneseal = this;
        return createOrUpdate(boneseal);
      }
    });

    return Boneseal;

    function createOrUpdate(boneseal) {
      if (boneseal._id) {
        return boneseal.$update(onSuccess, onError);
      } else {
        return boneseal.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(boneseal) {
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
