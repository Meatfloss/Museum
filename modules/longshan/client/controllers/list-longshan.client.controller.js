(function () {
  'use strict';

  angular
    .module('longshan')
    .controller('LongshanListController', LongshanListController);

  LongshanListController.$inject = ['$filter', 'LongshanService', 'authorsResolve'];

  function LongshanListController($filter, LongshanService, authors) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    LongshanService.query(function (data) {
      vm.longshan = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.longshan, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
      }
      if (vm.selectedAuthor && vm.selectedAuthor !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor } });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
    // update dropdown list
    vm.authors = authors;
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.authorList.unshift('All');
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.selectedAuthor = 'All';


    vm.updateForDynasty = function () {
      var filteredAuthors = vm.selectedDynasty === 'All' ? authors : _.filter(authors, { dynasty: vm.selectedDynasty });
      vm.authorList = _.map(filteredAuthors, 'name');
      vm.authorList.unshift('All');
      vm.selectedAuthor = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForAuthor = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());
