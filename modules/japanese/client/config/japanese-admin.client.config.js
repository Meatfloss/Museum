(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('japanese.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Japanese Art Collection',
      state: 'admin.japanese.list'
    });
  }
}());
