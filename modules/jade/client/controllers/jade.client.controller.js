(function () {
  'use strict';

  angular
    .module('jade')
    .controller('JadeController', JadeController);

  JadeController.$inject = ['$scope', 'jadeResolve', 'Authentication'];

  function JadeController($scope, jade, Authentication) {
    var vm = this;

    vm.jade = jade;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
