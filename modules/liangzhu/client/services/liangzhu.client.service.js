(function () {
  'use strict';

  angular
    .module('liangzhu.services')
    .factory('LiangzhuService', LiangzhuService);

  LiangzhuService.$inject = ['$resource'];

  function LiangzhuService($resource) {
    var Liangzhu = $resource('api/liangzhu/:liangzhuId', {
      liangzhuId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Liangzhu.prototype, {
      createOrUpdate: function () {
        var liangzhu = this;
        return createOrUpdate(liangzhu);
      }
    });

    return Liangzhu;

    function createOrUpdate(liangzhu) {
      if (liangzhu._id) {
        return liangzhu.$update(onSuccess, onError);
      } else {
        return liangzhu.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(liangzhu) {
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
