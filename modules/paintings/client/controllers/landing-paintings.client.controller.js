(function () {
  'use strict';

  angular
    .module('paintings')
    .controller('PaintingsLandingController', PaintingsLandingController);

  PaintingsLandingController.$inject = ['PaintingsService', 'authorsResolve'];

  function PaintingsLandingController(PaintingsService, authors) {
    var vm = this;
    vm.authors = authors;
    var dynastyListOrder = ['Pre Tang', 'Tang', 'Five Dynasties', 'Northern Song', 'Southern Song', 'Yuan', 'Ming', 'Qing', 'Modern'];
    vm.dynastyList = _.sortBy(_.map(_.uniqBy(authors, 'dynasty'), 'dynasty'), function (x) {
      return dynastyListOrder.indexOf(x);
    });
    vm.dynasties = [];
    for (var i = 0; i < vm.dynastyList.length; i++) {
      var indexName = vm.dynastyList[i] || 'Unknown';
      var temp = {};
      temp.name = indexName;
      temp.show = false;
      temp.authors = _.filter(vm.authors, filterFunction(i));
      vm.dynasties.push(temp);
    }

    vm.toggleAuthor = function (dynasty) {
      for (var i = 0; i < vm.dynasties.length; i++) {
        vm.dynasties[i].show = vm.dynasties[i].name === dynasty ? !vm.dynasties[i].show : false;
      }
    };

    vm.getAuthorURL = function (authorName) {
      return '' + authorName;
    };

    function filterFunction(i) {
      return function (author) {
        if (!author.dynasty) {
          return !vm.dynastyList[i];
        }
        return vm.dynastyList[i] === author.dynasty;
      };
    }
  }
}());
