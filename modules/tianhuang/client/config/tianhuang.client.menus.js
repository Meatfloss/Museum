(function () {
  'use strict';

  angular
    .module('tianhuang')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
