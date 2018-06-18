(function () {
  'use strict';

  angular
    .module('treasures')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
