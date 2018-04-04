(function () {
  'use strict';

  angular
    .module('bone')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
