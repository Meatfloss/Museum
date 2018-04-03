(function () {
  'use strict';

  angular
    .module('yporcelains')
    .controller('YporcelainsController', YporcelainsController);

  YporcelainsController.$inject = ['$scope', 'yporcelainsResolve', 'authorsResolve', 'Authentication'];

  function YporcelainsController($scope, yporcelains, authors, Authentication) {
    var vm = this;

    vm.yporcelains = yporcelains;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
