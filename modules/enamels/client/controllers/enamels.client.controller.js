(function () {
  'use strict';

  angular
    .module('enamels')
    .controller('EnamelsController', EnamelsController);

  EnamelsController.$inject = ['$scope', 'enamelResolve', 'authorsResolve', 'Authentication'];

  function EnamelsController($scope, enamel, authors, Authentication) {
    var vm = this;

    vm.enamel = enamel;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
