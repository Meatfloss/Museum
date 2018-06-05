(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('snuff.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Snuff',
      state: 'admin.snuff.list'
    });
  }
}());
