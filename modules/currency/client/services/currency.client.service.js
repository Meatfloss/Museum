(function () {
  'use strict';

  angular
    .module('currency.services')
    .factory('CurrencyService', CurrencyService);

  CurrencyService.$inject = ['$resource'];

  function CurrencyService($resource) {
    var Currency = $resource('api/currency/:currencyId', {
      currencyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Currency.prototype, {
      createOrUpdate: function () {
        var currency = this;
        return createOrUpdate(currency);
      }
    });

    return Currency;

    function createOrUpdate(currency) {
      if (currency._id) {
        return currency.$update(onSuccess, onError);
      } else {
        return currency.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(currency) {
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
