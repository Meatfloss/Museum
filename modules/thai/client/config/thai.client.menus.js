(function () {
  'use strict';

  angular
    .module('thai')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
