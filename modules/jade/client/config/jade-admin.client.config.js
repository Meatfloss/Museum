(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('jade.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Jade',
      state: 'admin.jade.list'
    });
  }
}());
