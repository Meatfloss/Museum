(function () {
  'use strict';

  angular
    .module('sealxi')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
