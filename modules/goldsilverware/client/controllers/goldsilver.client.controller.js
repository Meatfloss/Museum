(function () {
  'use strict';

  angular
    .module('goldsilver')
    .controller('GoldsilverController', GoldsilverController);

  GoldsilverController.$inject = ['$scope', 'goldsilverResolve', 'authorsResolve', 'Authentication'];

  function GoldsilverController($scope, goldsilver, authors, Authentication) {
    var vm = this;

    vm.goldsilver = goldsilver;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
