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
      title: 'Paintings',
      state: 'paintings.landing',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Bronzes',
      state: 'bronzes.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Zisha Teapots',
      state: 'teapots.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Famille Rose',
      state: 'familles.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Famille Rose Enamel',
      state: 'enamels.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Statues',
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
