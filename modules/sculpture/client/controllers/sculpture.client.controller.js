(function () {
  'use strict';

  angular
    .module('sculpture')
    .controller('SculptureController', SculptureController);

  SculptureController.$inject = ['$scope', 'sculptureResolve', 'Authentication'];

  function SculptureController($scope, sculpture, Authentication) {
    var vm = this;

    vm.sculpture = sculpture;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
