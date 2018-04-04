(function () {
  'use strict';

  angular
    .module('glassware')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
