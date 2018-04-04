(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('glassware.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Glassware',
      state: 'admin.glassware.list'
    });
  }
}());
