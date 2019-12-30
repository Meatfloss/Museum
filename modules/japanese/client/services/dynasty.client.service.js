(function () {
  'use strict';

  angular
    .module('japanese.services')
    .factory('JapaneseDynastyService', DynastyService);

  DynastyService.$inject = ['$resource'];

  function DynastyService($resource) {

    var dynasty1 = { name: '(17th C - 18th C) Ukiyo-e Woodblock Print', show: false };
    var dynasty2 = { name: 'Japanese Porcelain', show: false };


    return [dynasty1, dynasty2];
  }
}());
