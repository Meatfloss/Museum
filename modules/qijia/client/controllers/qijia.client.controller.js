(function () {
  'use strict';

  angular
    .module('qijia')
    .controller('QijiaController', QijiaController);

  QijiaController.$inject = ['$scope', 'qijiaResolve', 'authorsResolve', 'Authentication'];

  function QijiaController($scope, qijia, authors, Authentication) {
    var vm = this;

    vm.qijia = qijia;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
