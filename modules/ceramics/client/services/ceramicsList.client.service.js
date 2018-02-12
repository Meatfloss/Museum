(function () {
  'use strict';

  angular
    .module('ceramics.services')
    .factory('CeramicsListService', CeramicsListService);

  CeramicsListService.$inject = ['$resource'];

  function CeramicsListService($resource) {
    var CeramicList = $resource('api/ceramics/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return CeramicList;
  }
}());
