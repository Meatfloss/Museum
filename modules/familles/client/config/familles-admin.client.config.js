﻿(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('familles.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Familles',
      state: 'admin.familles.list'
    });
  }
}());
