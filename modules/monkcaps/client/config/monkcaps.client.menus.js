(function () {
  'use strict';

  angular
    .module('monkcaps')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
