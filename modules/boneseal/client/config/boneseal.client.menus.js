(function () {
  'use strict';

  angular
    .module('boneseal')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
