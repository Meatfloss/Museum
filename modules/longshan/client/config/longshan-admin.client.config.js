(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('longshan.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Longshan',
      state: 'admin.longshan.list'
    });
  }
}());
