(function () {
  'use strict';

  angular
    .module('mporcelains')
    .controller('MporcelainsController', MporcelainsController);

  MporcelainsController.$inject = ['$scope', 'mporcelainsResolve', 'Authentication'];

  function MporcelainsController($scope, mporcelains, Authentication) {
    var vm = this;

    vm.mporcelains = mporcelains;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
