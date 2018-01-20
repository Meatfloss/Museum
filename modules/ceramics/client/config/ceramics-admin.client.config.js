(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('ceramics.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Ceramics',
      state: 'admin.ceramics.list'
    });
  }
}());
