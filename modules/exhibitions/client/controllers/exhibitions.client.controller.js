(function () {
  'use strict';

  angular
    .module('exhibitions')
    .controller('ExhibitionsController', ExhibitionsController);

  ExhibitionsController.$inject = ['$scope', '$state', 'Authentication'];

  function ExhibitionsController($scope, $state, Authentication) {
    var vm = this;

    init();

    function init() {

    }
  }
}());
