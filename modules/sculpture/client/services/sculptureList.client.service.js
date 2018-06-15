(function () {
  'use strict';

  angular
    .module('sculpture.services')
    .factory('SculptureListService', SculptureListService);

  SculptureListService.$inject = ['$resource'];

  function SculptureListService($resource) {
    var SculptureList = $resource('api/sculpture/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return SculptureList;
  }
}());
