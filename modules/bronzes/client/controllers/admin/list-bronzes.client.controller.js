﻿(function () {
  'use strict';

  angular
    .module('bronzes.admin')
    .controller('BronzesListController', BronzesListController);

  BronzesListController.$inject = ['$filter', 'BronzesService'];

  function BronzesListController($filter, BronzesService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    BronzesService.query(function (data) {
      vm.bronzes = data;
      vm.buildPager();
      // update dropdown list
      vm.dynastyList = _.map(_.uniqBy(vm.bronzes, 'dynasty'), 'dynasty');
      vm.dynastyList.unshift('All');
      vm.selectedDynasty = 'All';
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.bronzes, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { dynasty: vm.selectedDynasty });
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
      vm.figureOutItemsToDisplay();
    };
  }
}());
