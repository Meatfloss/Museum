(function () {
  'use strict';

  angular
    .module('thai.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('thai', {
        abstract: true,
        url: '/thai',
        template: '<ui-view/>'
      })
      .state('thai.list', {
        url: '',
        templateUrl: 'modules/thai/client/views/list-thai.client.view.html',
        controller: 'ThaiListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Thai List'
        }
      })
      .state('thai.view', {
        url: '/:thaiId',
        templateUrl: 'modules/thai/client/views/view-thai.client.view.html',
        controller: 'ThaiController',
        controllerAs: 'vm',
        resolve: {
          thaiResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ thaiResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'ThaiService'];

  function getPainting($stateParams, ThaiService) {
    return ThaiService.get({
      thaiId: $stateParams.thaiId
    }).$promise;
  }
}());
