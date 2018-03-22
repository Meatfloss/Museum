(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('liangzhu.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Liangzhu',
      state: 'admin.liangzhu.list'
    });
  }
}());
