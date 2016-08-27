(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('authors.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Authors',
      state: 'admin.authors.list'
    });
  }
}());
