(function () {
  'use strict';

  angular
    .module('paintings')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Collections',
      state: 'collections',
      type: 'dropdown',
      roles: ['*'],
      position: 3
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Paintings',
      state: 'paintings.landing',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Bronzes',
      state: 'bronzes.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Zisha Teapots',
      state: 'teapots.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Famille Rose',
      state: 'familles.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Famille Rose Enamel',
      state: 'enamels.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Ancient Ceramics',
      state: 'ceramics.landing',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Chai Yao Porcelain',
      state: 'cporcelains.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Yuan Dynasty Porcelain',
      state: 'yporcelains.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Ming Dynasty Porcelain',
      state: 'mporcelains.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Qing Dynasty Porcelain',
      state: 'qßporcelains.list',
      roles: ['*']
    });
  }
}());
