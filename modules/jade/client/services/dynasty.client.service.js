(function () {
  'use strict';

  angular
    .module('jade.services')
    .factory('JadeDynastyService', DynastyService);

  DynastyService.$inject = ['$resource'];

  function DynastyService($resource) {

    var dynasty1 = { name: 'Neolithic Age', show: false };
    var dynasty2 = { name: 'Shang Dynasty', show: false };
    var dynasty3 = { name: 'Zhou Dynasty', show: false };
    var dynasty4 = { name: 'Spring & Autumn Period', show: false };
    var dynasty5 = { name: 'Warring States', show: false };
    var dynasty6 = { name: 'Qin Dynasty', show: false };
    var dynasty7 = { name: 'Han Dynasty', show: false };
    var dynasty8 = { name: 'Sui Dynasty', show: false };
    var dynasty9 = { name: 'Tang Dynasty', show: false };
    var dynasty10 = { name: 'Song Dynasty', show: false };
    var dynasty11 = { name: 'Yuan Dynasty', show: false };
    var dynasty12 = { name: 'Ming Dynasty', show: false };
    var dynasty13 = { name: 'Qing Dynasty', show: false };

    return [dynasty1, dynasty2, dynasty3, dynasty4, dynasty5, dynasty6, dynasty7, dynasty8, dynasty9, dynasty10, dynasty11, dynasty12, dynasty13];
  }
}());
