(function () {
  'use strict';

  angular
    .module('monkcaps')
    .controller('MonkcapsController', MonkcapsController);

  MonkcapsController.$inject = ['$scope', 'monkcapResolve', 'Authentication'];

  function MonkcapsController($scope, monkcap, Authentication) {
    var vm = this;

    vm.monkcap = monkcap;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
