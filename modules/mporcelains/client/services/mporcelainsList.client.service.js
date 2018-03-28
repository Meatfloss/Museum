(function () {
  'use strict';

  angular
    .module('mporcelains.services')
    .factory('MporcelainsListService', MporcelainsListService);

  MporcelainsListService.$inject = ['$resource'];

  function MporcelainsListService($resource) {
    var MporcelainsList = $resource('api/mporcelains/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return MporcelainsList;
  }
}());
