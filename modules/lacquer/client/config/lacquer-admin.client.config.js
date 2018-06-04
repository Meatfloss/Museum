(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('lacquer.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Lacquer',
      state: 'admin.lacquer.list'
    });
  }
}());
