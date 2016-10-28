(function () {
  'use strict';

  angular
    .module('bronzes')
    .controller('BronzesController', BronzesController);

  BronzesController.$inject = ['$scope', 'bronzeResolve', 'authorsResolve', 'Authentication'];

  function BronzesController($scope, bronze, authors, Authentication) {
    var vm = this;

    vm.bronze = bronze;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
