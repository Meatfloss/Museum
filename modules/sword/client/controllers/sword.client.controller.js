(function () {
  'use strict';

  angular
    .module('sword')
    .controller('SwordController', SwordController);

  SwordController.$inject = ['$scope', 'swordResolve', 'authorsResolve', 'Authentication'];

  function SwordController($scope, sword, authors, Authentication) {
    var vm = this;

    vm.sword = sword;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
