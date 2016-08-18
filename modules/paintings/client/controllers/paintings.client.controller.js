(function () {
  'use strict';

  angular
    .module('paintings')
    .controller('PaintingsController', PaintingsController);

  PaintingsController.$inject = ['$scope', 'paintingResolve', 'Authentication'];

  function PaintingsController($scope, painting, Authentication) {
    var vm = this;

    vm.painting = painting;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
