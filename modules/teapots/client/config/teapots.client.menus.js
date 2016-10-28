(function () {
  'use strict';

  angular
    .module('teapots')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
