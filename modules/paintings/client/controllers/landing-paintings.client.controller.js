(function () {
  'use strict';

  angular
    .module('paintings')
    .controller('PaintingsLandingController', PaintingsLandingController);

  PaintingsLandingController.$inject = ['PaintingsService', 'authorsResolve'];

  function PaintingsLandingController(PaintingsService, authors) {
    var vm = this;
    vm.authors = authors;
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.dynasties = [];
    for(var i=0; i<vm.dynastyList.length; i++)
    {
      //vm.dynasties[vm.dynastyList[i] || 'Unknown'] = {name:(vm.dynastyList[i] || 'Unknown'), show: false, authors: _.filter(vm.authors, {dynasty: vm.dynastyList[i]})};
      var indexName = vm.dynastyList[i] || 'Unknown';

      var temp = {};
      temp.name = indexName;
      temp.show = false;
      temp.authors = _.filter(vm.authors, function(author){
        if(!author.dynasty)
        {
          return !vm.dynastyList[i];
        }
        return vm.dynastyList[i] === author.dynasty;
      });
      vm.dynasties.push(temp);
    }

    vm.toggleAuthor = function(dynasty){
      for(var i=0; i<vm.dynasties.length; i++)
      {
        vm.dynasties[i].show = vm.dynasties[i].name === dynasty ? !vm.dynasties[i].show : false;
      }
    };

    vm.getAuthorURL = function(authorName)
    {
      return '' + authorName;
    }
  }
}());
