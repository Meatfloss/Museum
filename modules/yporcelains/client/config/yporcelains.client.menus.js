(function () {
  'use strict';

  angular
    .module('jade')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
