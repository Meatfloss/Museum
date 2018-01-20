(function () {
  'use strict';

  angular
    .module('ceramics')
    .controller('CeramicsLandingController', CeramicsLandingController);

  CeramicsLandingController.$inject = ['CeramicsService'];

  function CeramicsLandingController(CeramicsService) {
    var vm = this;

    var category1 = { name: 'Er Litou Culture(Bronze Age)', show: false, subCategories: ['Shang Dynasty', 'Warring States', 'Western Gin', 'Eastern Gin', 'Southern Dynasty'] };
    var category2 = { name: 'Tang/Five Dynasties', show: false, subCategories: ['Yue Yao', 'Zhangsha Yao', 'Jiaxian Yao', 'Marbled Porcelain', 'Tongguan Yao', 'Xing Yao', 'Ding Yao', 'Chai Yao'] };
    var category3 = { name: 'Song Dynasty(North & South)', show: false, subCategories: ['Ru Yao', 'Guan Yao', 'Ge Yao', 'Ding Yao', 'Jun Yao', 'Longquan Yao', 'Ying Qing Yao', 'Jizhou Yao', 'Yaozhou Yao', 'Cizhou Yao', 'Bacun Yao', 'Dengfeng Yao', 'Jian Yao', 'Xixia', 'Jin'] };
    vm.categories = [category1, category2, category3];

    vm.toggleCategory = function (dynasty) {
      for (var i = 0; i < vm.categories.length; i++) {
        vm.categories[i].show = vm.categories[i].name === dynasty ? !vm.categories[i].show : false;
      }
    };

  }
}());
