(function () {
  'use strict';

  angular
    .module('paintings.admin')
    .controller('PaintingsListController', PaintingsListController);

  PaintingsListController.$inject = ['PaintingsService', 'authorsResolve'];

  function PaintingsListController(PaintingsService, authors) {
    var vm = this;

    vm.paintings = PaintingsService.query();
    vm.authors = authors;
    
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    
    vm.authorList.unshift("All");
    vm.dynastyList.unshift("All");
    vm.selectedDynasty = "All";
    vm.selectedAuthor = "All";

    vm.updateForDynasty = function(){
      var filteredAuthors = vm.selectedDynasty === "All" ? authors : _.filter(authors, {dynasty:vm.selectedDynasty});
      vm.authorList = _.map(filteredAuthors, 'name');
    }
    
  }
} ());
