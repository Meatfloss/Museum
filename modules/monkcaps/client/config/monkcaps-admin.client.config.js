(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('monkcaps.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Monkcaps',
      state: 'admin.monkcaps.list'
    });
  }
}());
