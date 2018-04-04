(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('bone.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Bone',
      state: 'admin.bone.list'
    });
  }
}());
