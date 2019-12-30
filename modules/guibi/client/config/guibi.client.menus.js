(function () {
  'use strict';

  angular
    .module('guibi')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
