(function () {
  'use strict';

  angular
    .module('qporcelains.services')
    .factory('QporcelainsListService', QporcelainsListService);

  QporcelainsListService.$inject = ['$resource'];

  function QporcelainsListService($resource) {
    var QporcelainsList = $resource('api/qporcelains/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return QporcelainsList;
  }
}());
