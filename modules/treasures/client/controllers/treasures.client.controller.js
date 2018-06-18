(function () {
  'use strict';

  angular
    .module('treasures')
    .controller('TreasuresController', TreasuresController);

  TreasuresController.$inject = ['$scope', 'treasuresResolve', 'authorsResolve', 'Authentication'];

  function TreasuresController($scope, treasures, authors, Authentication) {
    var vm = this;

    vm.treasures = treasures;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
