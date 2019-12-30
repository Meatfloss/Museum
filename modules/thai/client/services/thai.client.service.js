(function () {
  'use strict';

  angular
    .module('thai.services')
    .factory('ThaiService', ThaiService);

  ThaiService.$inject = ['$resource'];

  function ThaiService($resource) {
    var Thai = $resource('api/thai/:thaiId', {
      thaiId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Thai.prototype, {
      createOrUpdate: function () {
        var thai = this;
        return createOrUpdate(thai);
      }
    });

    return Thai;

    function createOrUpdate(thai) {
      if (thai._id) {
        return thai.$update(onSuccess, onError);
      } else {
        return thai.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(thai) {
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
