(function () {
  'use strict';

  angular
    .module('qporcelains.services')
    .factory('QporcelainsDynastyService', DynastyService);

  DynastyService.$inject = ['$resource'];

  function DynastyService($resource) {

    var dynasty1 = { name: 'Shunzhi', show: false };
    var dynasty2 = { name: 'Kangxi', show: false };
    var dynasty3 = { name: 'Yongzheng', show: false };
    var dynasty4 = { name: 'Qianlong', show: false };
    var dynasty5 = { name: 'Jiaqing', show: false };
    var dynasty6 = { name: 'Daoguang', show: false };
    var dynasty7 = { name: 'Xianfeng', show: false };
    var dynasty8 = { name: 'Tongzhi', show: false };
    var dynasty9 = { name: 'Guangxu', show: false };
    var dynasty10 = { name: 'Xuantong', show: false };

    return [dynasty1, dynasty2, dynasty3, dynasty4, dynasty5, dynasty6, dynasty7, dynasty8, dynasty9, dynasty10];
  }
}());
