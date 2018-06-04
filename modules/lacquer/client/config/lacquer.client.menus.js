(function () {
  'use strict';

  angular
    .module('lacquer')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
