(function () {
  'use strict';

  angular
    .module('ceramics.admin')
    .controller('CeramicsListController', CeramicsListController);

  CeramicsListController.$inject = ['$filter', '$state', '$stateParams', 'CeramicsService', 'ceramicListResolve'];

  function CeramicsListController($filter, $state, $stateParams, CeramicsService, ceramics) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.ceramics = ceramics.data;
    vm.buildPager();
    // update dropdown list
    vm.dynastyList = _.compact(ceramics.metaData.dynastyList);
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = $stateParams.dynasty || 'All';
    if (vm.selectedDynasty !== 'All') {
      if (vm.selectedDynasty === 'all') {
        vm.selectedDynasty = 'All';
      } else {
        for (var j = 0; j < ceramics.metaData.dynastyList.length; j++) {
          if (vm.selectedDynasty === ceramics.metaData.dynastyList[j].toLowerCase()) {
            vm.selectedDynasty = ceramics.metaData.dynastyList[j];
            break;
          }
        }
      }

    }
    vm.categoryList = _.compact(ceramics.metaData.categoryList);
    vm.categoryList.unshift('All');
    vm.selectedCategory = $stateParams.category || 'All';
    if (vm.categoryList !== 'All') {
      if (vm.selectedCategory === 'all') {
        vm.selectedCategory = 'All';
      } else {
        for (var i = 0; i < ceramics.metaData.categoryList.length; i++) {
          if (vm.selectedCategory === ceramics.metaData.categoryList[i].toLowerCase()) {
            vm.selectedCategory = ceramics.metaData.categoryList[i];
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
      vm.filteredItems = $filter('filter')(vm.ceramics, { $: vm.search });
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
        filter.dynasty = vm.selectedDynasty.toLowerCase();
        filter.category = 'all';
        $state.go('ceramics.list-with-param', filter);
        return;
      }
      $state.go('ceramics.list');

    };

    vm.updateForCategory = function () {
      if (vm.selectedDynasty !== 'All' || vm.selectedCategory !== 'All') {
        var filter = {};
        filter.dynasty = vm.selectedDynasty.toLowerCase();
        filter.category = vm.selectedCategory.toLowerCase();
        $state.go('ceramics.list-with-param', filter);
        return;
      }
      $state.go('ceramics.list');
    };
  }
}());
