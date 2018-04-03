(function () {
  'use strict';

  angular
    .module('qporcelains')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());