(function () {
  'use strict';

  angular
    .module('mporcelains')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());