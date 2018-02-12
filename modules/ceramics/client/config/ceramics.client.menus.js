(function () {
  'use strict';

  angular
    .module('ceramics')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
