(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('qporcelains.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Qing Dynasty Porcelain',
      state: 'admin.qporcelains.list'
    });
  }
}());
