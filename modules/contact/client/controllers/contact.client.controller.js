(function () {
  'use strict';

  angular
    .module('contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$scope', '$state', 'Authentication'];

  function ContactController($scope, $state, Authentication) {
    var vm = this;

    init();

    function init() {

    }
  }
}());
