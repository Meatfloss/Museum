(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('sculpture.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Sculpture',
      state: 'admin.sculpture.list'
    });
  }
}());
