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
    // menuService.addSubMenuItem('topbar', 'collections', {
    //   title: 'Chai Yao Porcelain',
    //   state: 'cporcelains.list',
    //   roles: ['*']
    // });

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
      state: 'qporcelains.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Ancient Jade Collection',
      state: 'jade.landing',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Hongshan Culture',
      state: 'hongshan.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Liangzhu Culture',
      state: 'liangzhu.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Qijia Culture',
      state: 'qijia.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Longshan Culture',
      state: 'longshan.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Turtle and Oracle Bones',
      state: 'bone.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Emperor Wu Ding Bone Seals',
      state: 'boneseal.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Ancient Swords',
      state: 'sword.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Ancient Glassware',
      state: 'glassware.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Gold and Silver Ware',
      state: 'glodsilverware.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Lacquer Ware',
      state: 'lacquer.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Tianhuang Stone',
      state: 'tianhuang.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Ancient Seal Xi',
      state: 'sealxi.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Cloisonne Enamel',
      state: 'cloisonne.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Bronze Painted Famille-Rose Enamel',
      state: 'bronzepainted.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Crystal Collection',
      state: 'crystal.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Amber and Agate',
      state: 'amber.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Snuff Bottles',
      state: 'snuff.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Four Treasures',
      state: 'fourtreasure.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Ancient Currency',
      state: 'currency.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'collections', {
      title: 'Buddha Sculptures',
      state: 'buddha.list',
      roles: ['*']
    });
  }
}());
