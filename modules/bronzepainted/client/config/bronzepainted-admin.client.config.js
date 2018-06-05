(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('bronzepainted.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Bronzepainted',
      state: 'admin.bronzepainted.list'
    });
  }
}());
