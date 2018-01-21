(function () {
  'use strict';

  angular
    .module('ceramics.admin')
    .controller('CeramicsListController', CeramicsListController);

  CeramicsListController.$inject = ['$filter', 'CeramicsService'];

  function CeramicsListController($filter, CeramicsService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    CeramicsService.query(function (data) {
      vm.ceramics = data;
      vm.buildPager();
      // update dropdown list
      vm.dynastyList = _.compact(_.map(_.uniqBy(vm.ceramics, 'dynasty'), 'dynasty'));
      vm.dynastyList.unshift('All');
      vm.selectedDynasty = 'All';
      vm.categoryList = _.compact(_.map(_.uniqBy(vm.ceramics, 'category'), 'category'));
      vm.categoryList.unshift('All');
      vm.selectedCategory = 'All';
    });

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

    // function figureOutItemsToDisplay() {
    //   vm.filteredItems = $filter('filter')(vm.paintings, { $: vm.search });
    //   if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
    //     vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
    //   }
    //   if (vm.selectedAuthor && vm.selectedAuthor !== 'All') {
    //     vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor } });
    //   }
    //   vm.filterLength = vm.filteredItems.length;
    //   var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
    //   var end = begin + vm.itemsPerPage;
    //   vm.pagedItems = vm.filteredItems.slice(begin, end);
    // }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    vm.updateForDynasty = function () {
      var filteredItems = vm.selectedDynasty === 'All' ? vm.ceramics : _.filter(vm.ceramics, { dynasty: vm.selectedDynasty });
      vm.categoryList = _.compact(_.map(filteredItems, 'category'));
      vm.categoryList.unshift('All');
      vm.selectedCategory = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForCategory = function () {
      // update list
      vm.figureOutItemsToDisplay();
    };
  }
}());
