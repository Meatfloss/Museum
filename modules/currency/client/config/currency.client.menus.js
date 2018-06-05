(function () {
  'use strict';

  angular
    .module('currency')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
