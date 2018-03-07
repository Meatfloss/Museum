(function () {
  'use strict';

  angular
    .module('jade.services')
    .factory('JadeListService', JadeListService);

  JadeListService.$inject = ['$resource'];

  function JadeListService($resource) {
    var JadeList = $resource('api/jade/:dynasty/:category', {
      dynasty: '@dynasty',
      category: '@category'
    },
      { filteredList: { method: 'GET', isArray: false } });

    return JadeList;
  }
}());
