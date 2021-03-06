﻿(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('boneseal.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Boneseal',
      state: 'admin.boneseal.list'
    });
  }
}());
