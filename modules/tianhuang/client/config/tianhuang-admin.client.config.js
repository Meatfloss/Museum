(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('tianhuang.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Tianhuang',
      state: 'admin.tianhuang.list'
    });
  }
}());
