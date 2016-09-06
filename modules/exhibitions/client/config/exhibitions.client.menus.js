(function () {
  'use strict';

  angular
    .module('exhibitions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Exhibitions',
      state: 'exhibitions',
      roles: ['*'],
      position: 2
    });
  }
}());
