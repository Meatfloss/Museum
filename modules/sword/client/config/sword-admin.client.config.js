(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('sword.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Sword',
      state: 'admin.sword.list'
    });
  }
}());
