(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('treasures.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Treasures',
      state: 'admin.treasures.list'
    });
  }
}());
