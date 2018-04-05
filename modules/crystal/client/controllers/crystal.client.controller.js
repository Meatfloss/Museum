(function () {
  'use strict';

  angular
    .module('crystal')
    .controller('CrystalController', CrystalController);

  CrystalController.$inject = ['$scope', 'crystalResolve', 'authorsResolve', 'Authentication'];

  function CrystalController($scope, crystal, authors, Authentication) {
    var vm = this;

    vm.crystal = crystal;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
