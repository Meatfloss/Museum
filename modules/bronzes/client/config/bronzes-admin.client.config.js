(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('bronzes.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Bronzes',
      state: 'admin.bronzes.list'
    });
  }
}());
