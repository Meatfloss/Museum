(function () {
  'use strict';

  angular
    .module('amber')
    .controller('AmberController', AmberController);

  AmberController.$inject = ['$scope', 'amberResolve', 'authorsResolve', 'Authentication'];

  function AmberController($scope, amber, authors, Authentication) {
    var vm = this;

    vm.amber = amber;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
