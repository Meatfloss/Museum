(function () {
  'use strict';

  angular
    .module('korean.services')
    .factory('KoreanDynastyService', DynastyService);

  DynastyService.$inject = ['$resource'];

  function DynastyService($resource) {

    var dynasty1 = { name: 'Hongwu', show: false };
    var dynasty2 = { name: 'Jianwen', show: false };
    var dynasty3 = { name: 'Yongle', show: false };
    var dynasty4 = { name: 'Xuande', show: false };
    var dynasty5 = { name: 'Zhengtong', show: false };
    var dynasty6 = { name: 'Tianshun', show: false };
    var dynasty7 = { name: 'Chenghua', show: false };
    var dynasty8 = { name: 'Hongzhi', show: false };
    var dynasty9 = { name: 'Zhengde', show: false };
    var dynasty10 = { name: 'Jiajing', show: false };
    var dynasty11 = { name: 'Wanli', show: false };

    return [dynasty1, dynasty2, dynasty3, dynasty4, dynasty5, dynasty6, dynasty7, dynasty8, dynasty9, dynasty10, dynasty11];
  }
}());
