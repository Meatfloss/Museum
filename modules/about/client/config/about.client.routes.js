(function () {
  'use strict';

  angular
    .module('about.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'modules/about/client/views/about.client.view.html',
        controller: 'AboutController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'About'
        }
      });
  }
}());
