(function () {
  'use strict';

  angular
    .module('boneseal')
    .controller('BonesealController', BonesealController);

  BonesealController.$inject = ['$scope', 'bonesealResolve', 'authorsResolve', 'Authentication'];

  function BonesealController($scope, boneseal, authors, Authentication) {
    var vm = this;

    vm.boneseal = boneseal;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
