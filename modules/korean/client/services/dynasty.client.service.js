(function () {
  'use strict';

  angular
    .module('korean.services')
    .factory('KoreanDynastyService', DynastyService);

  DynastyService.$inject = ['$resource'];

  function DynastyService($resource) {

    var dynasty1 = { name: 'Korea National Treasure Collection', show: false };

    return [dynasty1];
  }
}());
