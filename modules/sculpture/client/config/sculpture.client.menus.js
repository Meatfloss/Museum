(function () {
  'use strict';

  angular
    .module('sculpture')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
