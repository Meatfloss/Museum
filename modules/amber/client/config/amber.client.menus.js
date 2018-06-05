(function () {
  'use strict';

  angular
    .module('amber')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
