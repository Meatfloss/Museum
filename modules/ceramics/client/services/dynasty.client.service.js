(function () {
  'use strict';

  angular
    .module('ceramics.services')
    .factory('CeramicDynastyService', DynastyService);

  DynastyService.$inject = ['$resource'];

  function DynastyService($resource) {

    var dynasty1 = { name: 'Er Litou Culture (Bronze Age)', show: false };
    var dynasty2 = { name: 'Shang Dynasty', show: false };
    var dynasty3 = { name: 'Warring States', show: false };
    var dynasty4 = { name: 'Han Dynasty', show: false };
    var dynasty5 = { name: 'Western Gin', show: false };
    var dynasty6 = { name: 'Eastern Gin', show: false };
    var dynasty7 = { name: 'Southern Dynasty', show: false };
    var dynasty8 = { name: 'Tang / Five Dynasties', show: false, categories: ['Tang Sancai', 'Yue Yao', 'Mise Porcelain', 'Changsha Yao', 'Jiaxian Yao', 'Marbled Porcelain', 'Tongguan Yao', 'Xing Yao', 'Ding Yao', 'Chai Yao', 'Blue and White Porcelain'] };
    var dynasty9 = { name: 'Liao(Xixia) Dynasty', show: false };
    var dynasty10 = { name: 'Song Dynasty (North & South)', show: false, categories: ['Ru Yao', 'Guan Yao', 'Ge Yao', 'Ding Yao', 'Jun Yao', 'Longquan Yao', 'Yingqing Yao', 'Jizhou Yao', 'Yaozhou Yao', 'Cizhou Yao', 'Bacun Yao', 'Dengfeng Yao', 'Jian Yao', 'Blue and White Porcelain'] };
    var dynasty11 = { name: 'Jin Dynasty', show: false };

    return [dynasty1, dynasty2, dynasty3, dynasty4, dynasty5, dynasty6, dynasty7, dynasty8, dynasty9, dynasty10, dynasty11];
  }
}());
