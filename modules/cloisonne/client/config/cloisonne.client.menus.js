(function () {
  'use strict';

  angular
    .module('cloisonne')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
