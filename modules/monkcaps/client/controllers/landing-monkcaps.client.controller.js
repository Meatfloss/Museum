(function () {
  'use strict';

  angular
    .module('monkcaps')
    .controller('MonkcapsLandingController', MonkcapsLandingController);

  MonkcapsLandingController.$inject = ['$state', 'dynastyResolve'];

  function MonkcapsLandingController($state, dynasties) {
    var vm = this;
    vm.dynasties = dynasties;

    vm.toggleDynasty = function (dynasty) {
      for (var i = 0; i < vm.dynasties.length; i++) {
        vm.dynasties[i].show = vm.dynasties[i].name === dynasty ? !vm.dynasties[i].show : false;
      }
    };
    vm.linkToList = function (dynasty) {
      if (!dynasty.categories) {
        var filter = {};
        filter.dynasty = dynasty.name;
        filter.category = 'all';
        $state.go('monkcaps.list-with-param', filter);
      }
    };

  }
}());
