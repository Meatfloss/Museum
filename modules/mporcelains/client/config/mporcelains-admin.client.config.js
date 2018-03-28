(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('mporcelains.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Ming Dynasty Porcelain',
      state: 'admin.mporcelains.list'
    });
  }
}());
