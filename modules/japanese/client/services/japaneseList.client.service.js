(function () {
  'use strict';

  angular
    .module('japanese.services')
    .factory('JapaneseListService', JapaneseListService);

  JapaneseListService.$inject = ['$resource'];

  function JapaneseListService($resource) {
    var JapaneseList = $resource('api/japanese/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return JapaneseList;
  }
}());
