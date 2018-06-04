(function () {
  'use strict';

  angular
    .module('goldsilver')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
