(function () {
  'use strict';

  angular
    .module('bronzepainted')
    .controller('BronzepaintedController', BronzepaintedController);

  BronzepaintedController.$inject = ['$scope', 'bronzepaintedResolve', 'authorsResolve', 'Authentication'];

  function BronzepaintedController($scope, bronzepainted, authors, Authentication) {
    var vm = this;

    vm.bronzepainted = bronzepainted;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
