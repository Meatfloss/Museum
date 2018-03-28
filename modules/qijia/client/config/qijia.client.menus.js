(function () {
  'use strict';

  angular
    .module('qijia')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
