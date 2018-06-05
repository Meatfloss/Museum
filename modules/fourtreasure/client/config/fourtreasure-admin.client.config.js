(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('fourtreasure.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Fourtreasure',
      state: 'admin.fourtreasure.list'
    });
  }
}());
