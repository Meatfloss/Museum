(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('yporcelains.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Yuan Dynasty Porcelains',
      state: 'admin.yporcelains.list'
    });
  }
}());
