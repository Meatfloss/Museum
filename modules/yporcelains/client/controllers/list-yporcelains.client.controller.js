(function () {
  'use strict';

  angular
    .module('yporcelains.admin')
    .controller('YporcelainsListController', YporcelainsListController);

  YporcelainsListController.$inject = ['$filter', '$state', '$stateParams', 'YporcelainsService', 'yporcelainsListResolve'];

  function YporcelainsListController($filter, $state, $stateParams, YporcelainsService, yporcelains) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.yporcelains = yporcelains.data;
    vm.buildPager();
    // update dropdown list
    vm.dynastyList = _.compact(yporcelains.metaData.dynastyList);
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = $stateParams.dynasty || 'All';
    if (vm.selectedDynasty !== 'All') {
      if (vm.selectedDynasty === 'all') {
        vm.selectedDynasty = 'All';
      } else {
        for (var j = 0; j < yporcelains.metaData.dynastyList.length; j++) {
          if (vm.selectedDynasty === yporcelains.metaData.dynastyList[j]) {
            vm.selectedDynasty = yporcelains.metaData.dynastyList[j];
            break;
          }
        }
      }

    }
    vm.categoryList = _.compact(yporcelains.metaData.categoryList);
    vm.categoryList.unshift('All');
    vm.selectedCategory = $stateParams.category || 'All';
    if (vm.categoryList !== 'All') {
      if (vm.selectedCategory === 'all') {
        vm.selectedCategory = 'All';
      } else {
        for (var i = 0; i < yporcelains.metaData.categoryList.length; i++) {
          if (vm.selectedCategory === yporcelains.metaData.categoryList[i]) {
            vm.selectedCategory = yporcelains.metaData.categoryList[i];
            break;
          }
        }
      }
    }

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.yporcelains, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { dynasty: vm.selectedDynasty });
      }
      if (vm.selectedCategory && vm.selectedCategory !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { category: vm.selectedCategory });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    vm.updateForDynasty = function () {
      if (vm.selectedDynasty !== 'All' || vm.selectedCategory !== 'All') {
        var filter = {};
        filter.dynasty = vm.selectedDynasty;
        filter.category = 'all';
        $state.go('yporcelains.list-with-param', filter);
        return;
      }
      $state.go('yporcelains.list');

    };

    vm.updateForCategory = function () {
      if (vm.selectedDynasty !== 'All' || vm.selectedCategory !== 'All') {
        var filter = {};
        filter.dynasty = vm.selectedDynasty;
        filter.category = vm.selectedCategory;
        $state.go('yporcelains.list-with-param', filter);
        return;
      }
      $state.go('yporcelains.list');
    };
  }
}());
