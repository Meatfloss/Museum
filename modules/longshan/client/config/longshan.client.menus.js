(function () {
  'use strict';

  angular
    .module('longshan')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
