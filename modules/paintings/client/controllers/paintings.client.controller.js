(function () {
  'use strict';

  angular
    .module('paintings')
    .controller('PaintingsController', PaintingsController);

  PaintingsController.$inject = ['$scope', 'paintingResolve', 'authorsResolve', 'Authentication'];

  function PaintingsController($scope, painting, authors, Authentication) {
    var vm = this;

    vm.painting = painting;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
