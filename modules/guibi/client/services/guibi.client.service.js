(function () {
  'use strict';

  angular
    .module('guibi.services')
    .factory('GuibiService', GuibiService);

  GuibiService.$inject = ['$resource'];

  function GuibiService($resource) {
    var Guibi = $resource('api/guibi/:guibiId', {
      guibiId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Guibi.prototype, {
      createOrUpdate: function () {
        var guibi = this;
        return createOrUpdate(guibi);
      }
    });

    return Guibi;

    function createOrUpdate(guibi) {
      if (guibi._id) {
        return guibi.$update(onSuccess, onError);
      } else {
        return guibi.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(guibi) {
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
