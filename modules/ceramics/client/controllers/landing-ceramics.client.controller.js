(function () {
  'use strict';

  angular
    .module('ceramics')
    .controller('CeramicsLandingController', CeramicsLandingController);

  CeramicsLandingController.$inject = ['dynastyResolve'];

  function CeramicsLandingController(dynasties) {
    var vm = this;
    vm.dynasties = dynasties;

    vm.toggleDynasty = function (dynasty) {
      for (var i = 0; i < vm.dynasties.length; i++) {
        vm.dynasties[i].show = vm.dynasties[i].name === dynasty ? !vm.dynasties[i].show : false;
      }
    };

  }
}());
