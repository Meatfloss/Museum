(function () {
  'use strict';

  angular
    .module('yporcelains')
    .controller('YporcelainsController', YporcelainsController);

  YporcelainsController.$inject = ['$scope', 'yporcelainsResolve', 'Authentication'];

  function YporcelainsController($scope, yporcelains, Authentication) {
    var vm = this;

    vm.yporcelains = yporcelains;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
