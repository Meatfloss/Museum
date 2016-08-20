(function () {
  'use strict';

  angular
    .module('paintings')
    .controller('PaintingsListController', PaintingsListController);

  PaintingsListController.$inject = ['PaintingsService'];

  function PaintingsListController(PaintingsService) {
    var vm = this;

    vm.paintings = PaintingsService.query();
  }
}());
