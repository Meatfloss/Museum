(function () {
  'use strict';

  angular
    .module('sword')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
