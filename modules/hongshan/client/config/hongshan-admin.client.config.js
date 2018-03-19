(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('hongshan.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Hongshan',
      state: 'admin.hongshan.list'
    });
  }
}());
