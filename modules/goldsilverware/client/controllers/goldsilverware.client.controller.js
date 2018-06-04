(function () {
  'use strict';

  angular
    .module('goldsilverware')
    .controller('GoldsilverwareController', GoldsilverwareController);

  GoldsilverwareController.$inject = ['$scope', 'goldsilverwareResolve', 'authorsResolve', 'Authentication'];

  function GoldsilverwareController($scope, goldsilverware, authors, Authentication) {
    var vm = this;

    vm.goldsilverware = goldsilverware;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
