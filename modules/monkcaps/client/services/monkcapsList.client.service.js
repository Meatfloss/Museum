(function () {
  'use strict';

  angular
    .module('monkcaps.services')
    .factory('MonkcapsListService', MonkcapsListService);

  MonkcapsListService.$inject = ['$resource'];

  function MonkcapsListService($resource) {
    var MonkcapList = $resource('api/monkcaps/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return MonkcapList;
  }
}());
