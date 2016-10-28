(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('enamels.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Enamels',
      state: 'admin.enamels.list'
    });
  }
}());
