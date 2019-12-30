(function () {
  'use strict';

  angular
    .module('korean.services')
    .factory('KoreanListService', KoreanListService);

  KoreanListService.$inject = ['$resource'];

  function KoreanListService($resource) {
    var KoreanList = $resource('api/korean/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return KoreanList;
  }
}());
