(function () {
  'use strict';

  angular
    .module('chat')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items hide chat
    // menuService.addMenuItem('topbar', {
    //   title: 'Chat',
    //   state: 'chat'
    // });
  }
}());
