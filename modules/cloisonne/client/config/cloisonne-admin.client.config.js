(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('cloisonne.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Cloisonne',
      state: 'admin.cloisonne.list'
    });
  }
}());
