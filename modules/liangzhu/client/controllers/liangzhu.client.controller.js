(function () {
  'use strict';

  angular
    .module('liangzhu')
    .controller('LiangzhuController', LiangzhuController);

  LiangzhuController.$inject = ['$scope', 'liangzhuResolve', 'authorsResolve', 'Authentication'];

  function LiangzhuController($scope, liangzhu, authors, Authentication) {
    var vm = this;

    vm.liangzhu = liangzhu;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
