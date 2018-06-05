(function () {
  'use strict';

  angular
    .module('snuff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
