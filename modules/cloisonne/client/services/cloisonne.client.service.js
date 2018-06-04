(function () {
  'use strict';

  angular
    .module('cloisonne.services')
    .factory('CloisonneService', CloisonneService);

  CloisonneService.$inject = ['$resource'];

  function CloisonneService($resource) {
    var Cloisonne = $resource('api/cloisonne/:cloisonneId', {
      cloisonneId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Cloisonne.prototype, {
      createOrUpdate: function () {
        var cloisonne = this;
        return createOrUpdate(cloisonne);
      }
    });

    return Cloisonne;

    function createOrUpdate(cloisonne) {
      if (cloisonne._id) {
        return cloisonne.$update(onSuccess, onError);
      } else {
        return cloisonne.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(cloisonne) {
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
