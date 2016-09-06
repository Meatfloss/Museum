(function () {
  'use strict';

  angular
    .module('exhibitions.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('exhibitions', {
        url: '/exhibitions',
        templateUrl: 'modules/exhibitions/client/views/exhibitions.client.view.html',
        controller: 'ExhibitionsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Exhibitions'
        }
      });
  }
}());
