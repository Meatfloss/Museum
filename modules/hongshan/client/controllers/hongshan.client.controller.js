(function () {
  'use strict';

  angular
    .module('hongshan')
    .controller('HongshanController', HongshanController);

  HongshanController.$inject = ['$scope', 'hongshanResolve', 'authorsResolve', 'Authentication'];

  function HongshanController($scope, hongshan, authors, Authentication) {
    var vm = this;

    vm.hongshan = hongshan;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
