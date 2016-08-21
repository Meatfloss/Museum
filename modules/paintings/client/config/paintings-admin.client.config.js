(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('paintings.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Paintings',
      state: 'admin.paintings.list'
    });
  }
}());
