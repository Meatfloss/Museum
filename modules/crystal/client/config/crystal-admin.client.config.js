(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('crystal.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Crystal',
      state: 'admin.crystal.list'
    });
  }
}());
