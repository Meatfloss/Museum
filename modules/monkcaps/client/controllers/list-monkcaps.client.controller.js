(function () {
  'use strict';

  angular
    .module('monkcaps.admin')
    .controller('MonkcapsListController', MonkcapsListController);

  MonkcapsListController.$inject = ['$filter', '$state', '$stateParams', 'MonkcapsService', 'monkcapListResolve'];

  function MonkcapsListController($filter, $state, $stateParams, MonkcapsService, monkcaps) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.monkcaps = monkcaps.data;
    vm.buildPager();
    // update dropdown list
    vm.dynastyList = _.compact(monkcaps.metaData.dynastyList);
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = $stateParams.dynasty || 'All';
    if (vm.selectedDynasty !== 'All') {
      if (vm.selectedDynasty === 'all') {
        vm.selectedDynasty = 'All';
      } else {
        for (var j = 0; j < monkcaps.metaData.dynastyList.length; j++) {
          if (vm.selectedDynasty === monkcaps.metaData.dynastyList[j]) {
            vm.selectedDynasty = monkcaps.metaData.dynastyList[j];
            break;
          }
        }
      }

    }
    vm.categoryList = _.compact(monkcaps.metaData.categoryList);
    vm.categoryList.unshift('All');
    vm.selectedCategory = $stateParams.category || 'All';
    if (vm.categoryList !== 'All') {
      if (vm.selectedCategory === 'all') {
        vm.selectedCategory = 'All';
      } else {
        for (var i = 0; i < monkcaps.metaData.categoryList.length; i++) {
          if (vm.selectedCategory === monkcaps.metaData.categoryList[i]) {
            vm.selectedCategory = monkcaps.metaData.categoryList[i];
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
      vm.filteredItems = $filter('filter')(vm.monkcaps, { $: vm.search });
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
        $state.go('monkcaps.list-with-param', filter);
        return;
      }
      $state.go('monkcaps.list');

    };

    vm.updateForCategory = function () {
      if (vm.selectedDynasty !== 'All' || vm.selectedCategory !== 'All') {
        var filter = {};
        filter.dynasty = vm.selectedDynasty;
        filter.category = vm.selectedCategory;
        $state.go('monkcaps.list-with-param', filter);
        return;
      }
      $state.go('monkcaps.list');
    };
  }
}());
