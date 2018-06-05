(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('currency.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Currency',
      state: 'admin.currency.list'
    });
  }
}());
