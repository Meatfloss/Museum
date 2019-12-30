(function () {
  'use strict';

  angular
    .module('guibi')
    .controller('GuibiController', GuibiController);

  GuibiController.$inject = ['$scope', 'guibiResolve', 'authorsResolve', 'Authentication'];

  function GuibiController($scope, guibi, authors, Authentication) {
    var vm = this;

    vm.guibi = guibi;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
