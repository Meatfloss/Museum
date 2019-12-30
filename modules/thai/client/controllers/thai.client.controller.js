(function () {
  'use strict';

  angular
    .module('thai')
    .controller('ThaiController', ThaiController);

  ThaiController.$inject = ['$scope', 'thaiResolve', 'authorsResolve', 'Authentication'];

  function ThaiController($scope, thai, authors, Authentication) {
    var vm = this;

    vm.thai = thai;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
