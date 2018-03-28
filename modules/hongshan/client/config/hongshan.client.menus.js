(function () {
  'use strict';

  angular
    .module('hongshan')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
