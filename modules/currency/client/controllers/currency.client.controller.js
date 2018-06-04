(function () {
  'use strict';

  angular
    .module('currency')
    .controller('CurrencyController', CurrencyController);

  CurrencyController.$inject = ['$scope', 'currencyResolve', 'authorsResolve', 'Authentication'];

  function CurrencyController($scope, currency, authors, Authentication) {
    var vm = this;

    vm.currency = currency;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
