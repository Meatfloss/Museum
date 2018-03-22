(function () {
  'use strict';

  angular
    .module('longshan')
    .controller('LongshanController', LongshanController);

  LongshanController.$inject = ['$scope', 'longshanResolve', 'authorsResolve', 'Authentication'];

  function LongshanController($scope, longshan, authors, Authentication) {
    var vm = this;

    vm.longshan = longshan;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
