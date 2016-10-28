(function () {
  'use strict';

  angular
    .module('teapots')
    .controller('TeapotsController', TeapotsController);

  TeapotsController.$inject = ['$scope', 'teapotResolve', 'authorsResolve', 'Authentication'];

  function TeapotsController($scope, teapot, authors, Authentication) {
    var vm = this;

    vm.teapot = teapot;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
