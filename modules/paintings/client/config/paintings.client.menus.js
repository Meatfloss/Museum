(function () {
  'use strict';

  angular
    .module('paintings')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Paintings',
      state: 'paintings',
      type: 'dropdown',
      roles: ['*'],
      position: 3
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'List Paintings',
      state: 'paintings.list',
      roles: ['*']
    });
  }
}());
