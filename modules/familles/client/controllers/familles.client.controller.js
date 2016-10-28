(function () {
  'use strict';

  angular
    .module('familles')
    .controller('FamillesController', FamillesController);

  FamillesController.$inject = ['$scope', 'familleResolve', 'authorsResolve', 'Authentication'];

  function FamillesController($scope, famille, authors, Authentication) {
    var vm = this;

    vm.famille = famille;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
