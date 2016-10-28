(function () {
  'use strict';

  angular
    .module('bronzes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
