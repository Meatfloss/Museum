(function () {
  'use strict';

  angular
    .module('paintings')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Collections',
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

        // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'List Bronzes',
      state: 'bronzes.list',
      roles: ['*']
    });

        // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'List Zisha Teapot',
      state: 'paintings.list',
      roles: ['*']
    });

        // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'List Famille Rose',
      state: 'paintings.list',
      roles: ['*']
    });

        // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'List Enamel',
      state: 'paintings.list',
      roles: ['*']
    });

            // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'List Statues',
      state: 'paintings.list',
      roles: ['*']
    });

            // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Others',
      state: 'paintings.list',
      roles: ['*']
    });
  }
}());
