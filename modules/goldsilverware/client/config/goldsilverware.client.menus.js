(function () {
  'use strict';

  angular
    .module('goldsilverware')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
