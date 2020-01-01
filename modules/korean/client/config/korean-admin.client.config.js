(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('korean.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Korean Art Collection',
      state: 'admin.korean.list'
    });
  }
}());
