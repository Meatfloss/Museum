(function () {
  'use strict';

  angular
    .module('authors')
    .controller('AuthorPaintingsController', PaintingsListController);

  PaintingsListController.$inject = ['$translate', '$rootScope', 'authorResolve', 'paintingResolve'];

  function PaintingsListController($translate, $rootScope, author, paintings) {
    var vm = this;
    vm.author = author;
    vm.paintings = paintings;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.showDescription = showDescription;
    vm.hideDescription = hideDescription;
    vm.buildPager();
    vm.hideDescription();

    vm.showEnglish = $translate.use() === 'en';
    $rootScope.$on('$translateChangeSuccess', function () {
      vm.showEnglish = $translate.use() === 'en';
    });

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

    function showDescription() {
      vm.description = author.description;
      vm.descriptionZH = author.descriptionZH;
      vm.descriptionHide = false;
      vm.descriptionZHHide = false;
    }

    function hideDescription() {
      vm.descriptionHide = author.description && author.description.length > 1000;
      vm.descriptionZHHide = author.descriptionZH && author.descriptionZH.length > 500;
      vm.description = vm.descriptionHide ? author.description.slice(0, 1000) + '...' : author.description;
      vm.descriptionZH = vm.descriptionZHHide ? author.descriptionZH.slice(0, 500) + '...' : author.descriptionZH;
    }
  }
}());
