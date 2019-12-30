(function () {
  'use strict';

  angular
    .module('japanese')
    .controller('JapaneseController', JapaneseController);

  JapaneseController.$inject = ['$scope', 'japaneseResolve', 'Authentication'];

  function JapaneseController($scope, japanese, Authentication) {
    var vm = this;

    vm.japanese = japanese;
    vm.authentication = Authentication;
    // vm.authors = dynasties;
    vm.error = null;

  }
}());
