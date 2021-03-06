﻿(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('teapots.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Teapots',
      state: 'admin.teapots.list'
    });
  }
}());
