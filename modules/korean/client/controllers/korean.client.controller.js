(function () {
  'use strict';

  angular
    .module('korean')
    .controller('KoreanController', KoreanController);

  KoreanController.$inject = ['$scope', 'koreanResolve', 'Authentication'];

  function KoreanController($scope, korean, Authentication) {
    var vm = this;

    vm.korean = korean;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
