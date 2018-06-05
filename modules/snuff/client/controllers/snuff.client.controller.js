(function () {
  'use strict';

  angular
    .module('snuff')
    .controller('SnuffController', SnuffController);

  SnuffController.$inject = ['$scope', 'snuffResolve', 'authorsResolve', 'Authentication'];

  function SnuffController($scope, snuff, authors, Authentication) {
    var vm = this;

    vm.snuff = snuff;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
