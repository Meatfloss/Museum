(function () {
  'use strict';

  angular
    .module('ceramics')
    .controller('CeramicsController', CeramicsController);

  CeramicsController.$inject = ['$scope', 'ceramicResolve', 'Authentication'];

  function CeramicsController($scope, ceramic, Authentication) {
    var vm = this;

    vm.ceramic = ceramic;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
