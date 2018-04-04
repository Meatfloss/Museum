(function () {
  'use strict';

  angular
    .module('glassware')
    .controller('GlasswareController', GlasswareController);

  GlasswareController.$inject = ['$scope', 'glasswareResolve', 'authorsResolve', 'Authentication'];

  function GlasswareController($scope, glassware, authors, Authentication) {
    var vm = this;

    vm.glassware = glassware;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
