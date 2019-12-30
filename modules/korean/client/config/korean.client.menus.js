(function () {
  'use strict';

  angular
    .module('korean')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
