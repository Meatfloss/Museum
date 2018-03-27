(function () {
  'use strict';

  angular
    .module('yporcelains.services')
    .factory('YporcelainsListService', YporcelainsListService);

  YporcelainsListService.$inject = ['$resource'];

  function YporcelainsListService($resource) {
    var YporcelainsList = $resource('api/yporcelains/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return YporcelainsList;
  }
}());
