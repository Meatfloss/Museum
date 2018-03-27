(function () {
  'use strict';

  angular
    .module('yporcelains')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());