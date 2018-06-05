(function () {
  'use strict';

  angular
    .module('fourtreasure')
    .controller('FourtreasureController', FourtreasureController);

  FourtreasureController.$inject = ['$scope', 'fourtreasureResolve', 'authorsResolve', 'Authentication'];

  function FourtreasureController($scope, fourtreasure, authors, Authentication) {
    var vm = this;

    vm.fourtreasure = fourtreasure;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
