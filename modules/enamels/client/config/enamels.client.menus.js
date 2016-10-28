(function () {
  'use strict';

  angular
    .module('enamels')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
