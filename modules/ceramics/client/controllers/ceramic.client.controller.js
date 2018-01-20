(function () {
  'use strict';

  angular
    .module('ceramics')
    .controller('CeramicsController', CeramicsController);

  CeramicsController.$inject = ['$scope', 'ceramicResolve', 'authorsResolve', 'Authentication'];

  function CeramicsController($scope, ceramic, authors, Authentication) {
    var vm = this;

    vm.ceramic = ceramic;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
