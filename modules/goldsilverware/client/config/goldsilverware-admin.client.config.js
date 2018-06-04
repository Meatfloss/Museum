
(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('goldsilverware.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Goldsilverware',
      state: 'admin.goldsilverware.list'
    });
  }
}());
