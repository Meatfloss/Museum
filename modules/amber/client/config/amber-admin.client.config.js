(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('amber.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Amber',
      state: 'admin.amber.list'
    });
  }
}());
