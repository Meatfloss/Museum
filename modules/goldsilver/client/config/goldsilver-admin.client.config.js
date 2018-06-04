
(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('goldsilver.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Goldsilver',
      state: 'admin.goldsilver.list'
    });
  }
}());
