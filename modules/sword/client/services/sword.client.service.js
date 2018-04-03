(function () {
  'use strict';

  angular
    .module('sword.services')
    .factory('SwordService', SwordService);

  SwordService.$inject = ['$resource'];

  function SwordService($resource) {
    var Sword = $resource('api/sword/:swordId', {
      swordId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Sword.prototype, {
      createOrUpdate: function () {
        var sword = this;
        return createOrUpdate(sword);
      }
    });

    return Sword;

    function createOrUpdate(sword) {
      if (sword._id) {
        return sword.$update(onSuccess, onError);
      } else {
        return sword.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(sword) {
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
