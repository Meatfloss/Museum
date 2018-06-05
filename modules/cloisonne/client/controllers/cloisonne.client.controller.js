(function () {
  'use strict';

  angular
    .module('cloisonne')
    .controller('CloisonneController', CloisonneController);

  CloisonneController.$inject = ['$scope', 'cloisonneResolve', 'authorsResolve', 'Authentication'];

  function CloisonneController($scope, cloisonne, authors, Authentication) {
    var vm = this;

    vm.cloisonne = cloisonne;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
