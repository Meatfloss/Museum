(function () {
  'use strict';

  angular
    .module('fourtreasure')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
