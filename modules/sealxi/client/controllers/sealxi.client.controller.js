(function () {
  'use strict';

  angular
    .module('sealxi')
    .controller('SealxiController', SealxiController);

  SealxiController.$inject = ['$scope', 'sealxiResolve', 'authorsResolve', 'Authentication'];

  function SealxiController($scope, sealxi, authors, Authentication) {
    var vm = this;

    vm.sealxi = sealxi;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
