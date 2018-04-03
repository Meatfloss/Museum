(function () {
  'use strict';

  angular
    .module('qporcelains')
    .controller('QporcelainsController', QporcelainsController);

  QporcelainsController.$inject = ['$scope', 'qporcelainsResolve', 'Authentication'];

  function QporcelainsController($scope, qporcelains, Authentication) {
    var vm = this;

    vm.qporcelains = qporcelains;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
