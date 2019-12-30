(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('thai.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Thai',
      state: 'admin.thai.list'
    });
  }
}());
