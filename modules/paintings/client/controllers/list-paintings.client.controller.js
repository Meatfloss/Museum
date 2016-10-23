(function () {
  'use strict';

  angular
    .module('paintings')
    .controller('PaintingsListController', PaintingsListController);

  PaintingsListController.$inject = ['PaintingsService', 'authorsResolve'];

  function PaintingsListController(PaintingsService, authors) {
    var vm = this;

    vm.paintings = PaintingsService.query();
    vm.authors = authors;
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
  }
}());
