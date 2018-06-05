(function () {
  'use strict';

  angular
    .module('bronzepainted')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
