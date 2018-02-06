(function () {
  'use strict';

  angular
    .module('ceramics.admin')
    .controller('CeramicsListController', CeramicsListController);

  CeramicsListController.$inject = ['$filter', '$state', 'CeramicsService', 'ceramicListResolve'];

  function CeramicsListController($filter, $state, CeramicsService, ceramics) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.ceramics = ceramics.data;
    vm.buildPager();
    // update dropdown list
    vm.dynastyList = ceramics.metaData.dynastyList;
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.categoryList = ceramics.metaData.categoryList;
    vm.categoryList.unshift('All');
    vm.selectedCategory = 'All';

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
      var filter = {};
      if (vm.selectedDynasty !== 'All' || vm.selectedCategory !== 'All') {
        filter.dynasty = vm.selectedDynasty.toLowerCase();
        filter.category = vm.selectedCategory.toLowerCase();
      }
      $state.go('ceramics.list-with-param', filter);
      // CeramicsService.filteredList(filter, function (ceramics) {
      //   vm.ceramics = ceramics;
      //   vm.figureOutItemsToDisplay();
      // });

    };

    vm.updateForCategory = function () {
      // update list
      vm.figureOutItemsToDisplay();
    };
  }
}());
