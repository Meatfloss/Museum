(function () {
  'use strict';

  angular
    .module('about')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope', '$state', 'Authentication'];

  function AboutController($scope, $state, Authentication) {
    var vm = this;

    init();

    function init() {

    }
  }
}());
