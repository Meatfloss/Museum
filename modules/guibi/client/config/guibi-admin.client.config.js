(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('guibi.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Guibi',
      state: 'admin.guibi.list'
    });
  }
}());
