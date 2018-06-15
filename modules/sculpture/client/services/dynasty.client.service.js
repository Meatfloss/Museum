(function () {
  'use strict';

  angular
    .module('sculpture.services')
    .factory('SculptureDynastyService', DynastyService);

  DynastyService.$inject = ['$resource'];

  function DynastyService($resource) {

    var dynasty1 = { name: 'Northern Wei', show: false };
    var dynasty2 = { name: 'Eastern Wei', show: false };
    var dynasty3 = { name: 'Western Wei', show: false };
    var dynasty4 = { name: 'Northern Qi', show: false };
    var dynasty5 = { name: 'Northern Zhou', show: false };
    var dynasty6 = { name: 'Sui Dynasty', show: false };
    var dynasty7 = { name: 'Tang Dynasty', show: false };
    var dynasty8 = { name: 'Song Dynasty', show: false };
    var dynasty9 = { name: 'Yuan Dynasty', show: false };
    var dynasty10 = { name: 'Ming Dynasty', show: false };
    var dynasty11 = { name: 'Qing Dynasty', show: false };
    var dynasty12 = { name: 'Tibet Buddha', show: false };

    return [dynasty1, dynasty2, dynasty3, dynasty4, dynasty5, dynasty6, dynasty7, dynasty8, dynasty9, dynasty10, dynasty11, dynasty12];
  }
}());
