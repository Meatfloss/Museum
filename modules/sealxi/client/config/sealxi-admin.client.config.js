(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('sealxi.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Sealxi',
      state: 'admin.sealxi.list'
    });
  }
}());
