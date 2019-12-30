(function () {
  'use strict';

  angular
    .module('paintings.admin')
    .controller('PaintingsListController', PaintingsListController);

  PaintingsListController.$inject = ['$translate', '$rootScope', '$filter', 'PaintingsService', 'authorsResolve'];

  function PaintingsListController($translate, $rootScope, $filter, PaintingsService, authors) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    var translateName = $translate.use() === 'en' ? 'name' : 'nameZH';
    $rootScope.$on('$translateChangeSuccess', function () {
      translateName = $translate.use() === 'en' ? 'name' : 'nameZH';
      vm.authorList = _.map(vm.currentAuthors, translateName);
      vm.authorList.unshift($translate.use() === 'en' ? 'All' : '全部');
      if ($translate.use() === 'en') {
        vm.selectedAuthorName = vm.selectedAuthor ? vm.selectedAuthor.name : 'All';
      }
      else {
        vm.selectedAuthorName = vm.selectedAuthor ? vm.selectedAuthor.nameZH : '全部';
      }
    });

    PaintingsService.query(function (data) {
      vm.paintings = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.paintings, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
      }
      if (vm.selectedAuthor && vm.selectedAuthorName !== 'All' && vm.selectedAuthorName !== '全部') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor.name } });
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
    vm.currentAuthors = authors.slice(0, authors.length);
    vm.authorList = _.map(authors, translateName);
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.authorList.unshift('All');
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.selectedAuthorName = 'All';

    vm.updateForDynasty = function () {
      var filteredAuthors = vm.selectedDynasty === 'All' ? authors : _.filter(authors, { dynasty: vm.selectedDynasty });
      vm.currentAuthors = filteredAuthors.slice(0, authors.length);
      vm.authorList = _.map(filteredAuthors, translateName);
      vm.authorList.unshift('All');
      vm.selectedAuthorName = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForAuthor = function () {
      vm.selectedAuthor = _.find(vm.currentAuthors, function (a) {
        return a.name === vm.selectedAuthorName || a.nameZH === vm.selectedAuthorName;
      });

      vm.figureOutItemsToDisplay();
    };

  }
}());
