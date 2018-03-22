(function () {
  'use strict';

  angular
    .module('liangzhu')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
