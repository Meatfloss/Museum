(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('qijia.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Qijia',
      state: 'admin.qijia.list'
    });
  }
}());
