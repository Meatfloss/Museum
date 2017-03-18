(function () {
  'use strict';

  angular.module('core').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$translate', '$scope', '$state', 'Authentication', 'menuService'];

  function HeaderController($translate, $scope, $state, Authentication, menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };
    $scope.isEnglish = function () {
      return $translate.use() === 'en';
    };
  }
}());
