(function () {
  'use strict';

  angular
    .module('crystal')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
