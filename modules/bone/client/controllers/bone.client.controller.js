(function () {
  'use strict';

  angular
    .module('bone')
    .controller('BoneController', BoneController);

  BoneController.$inject = ['$scope', 'boneResolve', 'authorsResolve', 'Authentication'];

  function BoneController($scope, bone, authors, Authentication) {
    var vm = this;

    vm.bone = bone;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());
