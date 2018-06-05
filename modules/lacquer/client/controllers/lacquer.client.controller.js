(function () {
  'use strict';

  angular
    .module('lacquer')
    .controller('LacquerController', LacquerController);

  LacquerController.$inject = ['$scope', 'lacquerResolve', 'authorsResolve', 'Authentication'];

  function LacquerController($scope, lacquer, authors, Authentication) {
    var vm = this;

    vm.lacquer = lacquer;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
