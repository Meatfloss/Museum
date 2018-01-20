(function () {
  'use strict';

  angular
    .module('ceramics')
    .controller('CeramicsLandingController', CeramicsLandingController);

  CeramicsLandingController.$inject = ['CeramicsService'];

  function CeramicsLandingController(CeramicsService) {
    var vm = this;

    var dynasty1 = { name: 'Er Litou Culture(Bronze Age)', show: false };
    var dynasty2 = { name: 'Shang Dynasty', show: false };
    var dynasty3 = { name: 'Warring States', show: false };
    var dynasty4 = { name: 'Western Gin', show: false };
    var dynasty5 = { name: 'Eastern Gin', show: false };
    var dynasty6 = { name: 'Southern Dynasty', show: false };
    var dynasty7 = { name: 'Tang/Five Dynasties', show: false, categories: ['Yue Yao', 'Zhangsha Yao', 'Jiaxian Yao', 'Marbled Porcelain', 'Tongguan Yao', 'Xing Yao', 'Ding Yao', 'Chai Yao'] };
    var dynasty8 = { name: 'Song Dynasty(North & South)', show: false, categories: ['Ru Yao', 'Guan Yao', 'Ge Yao', 'Ding Yao', 'Jun Yao', 'Longquan Yao', 'Ying Qing Yao', 'Jizhou Yao', 'Yaozhou Yao', 'Cizhou Yao', 'Bacun Yao', 'Dengfeng Yao', 'Jian Yao'] };
    var dynasty9 = { name: 'Xixia', show: false };
    var dynasty10 = { name: 'Jin', show: false };

    vm.dynasties = [dynasty1, dynasty2, dynasty3, dynasty4, dynasty5, dynasty6, dynasty7, dynasty8, dynasty9, dynasty10];

    vm.toggleDynasty = function (dynasty) {
      for (var i = 0; i < vm.dynasties.length; i++) {
        vm.dynasties[i].show = vm.dynasties[i].name === dynasty ? !vm.dynasties[i].show : false;
      }
    };

  }
}());
