(function () {
  'use strict';

  angular
    .module('bone.services')
    .factory('BoneService', BoneService);

  BoneService.$inject = ['$resource'];

  function BoneService($resource) {
    var Bone = $resource('api/bone/:boneId', {
      boneId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Bone.prototype, {
      createOrUpdate: function () {
        var bone = this;
        return createOrUpdate(bone);
      }
    });

    return Bone;

    function createOrUpdate(bone) {
      if (bone._id) {
        return bone.$update(onSuccess, onError);
      } else {
        return bone.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(bone) {
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
