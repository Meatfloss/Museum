(function () {
  'use strict';

  angular
    .module('authors')
    .controller('AuthorPaintingsController', PaintingsListController);

  PaintingsListController.$inject = ['$filter', 'authorResolve', 'paintingResolve'];

  function PaintingsListController($filter, author, paintings) {
    var vm = this;
    vm.author = author;
    vm.paintings = paintings;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.buildPager();

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filterLength = vm.paintings.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.paintings.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
