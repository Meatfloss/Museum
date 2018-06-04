(function () {
  'use strict';

  angular
    .module('tianhuang')
    .controller('TianhuangController', TianhuangController);

  TianhuangController.$inject = ['$scope', 'tianhuangResolve', 'authorsResolve', 'Authentication'];

  function TianhuangController($scope, tianhuang, authors, Authentication) {
    var vm = this;

    vm.tianhuang = tianhuang;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
