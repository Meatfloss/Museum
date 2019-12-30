(function () {
  'use strict';

  angular
    .module('japanese')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
