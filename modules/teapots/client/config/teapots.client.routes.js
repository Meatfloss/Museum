(function () {
  'use strict';

  angular
    .module('teapots.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teapots', {
        abstract: true,
        url: '/teapots',
        template: '<ui-view/>'
      })
      .state('teapots.list', {
        url: '',
        templateUrl: 'modules/teapots/client/views/list-teapots.client.view.html',
        controller: 'TeapotsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Teapots List'
        }
      })
      .state('teapots.view', {
        url: '/:teapotId',
        templateUrl: 'modules/teapots/client/views/view-teapot.client.view.html',
        controller: 'TeapotsController',
        controllerAs: 'vm',
        resolve: {
          teapotResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ teapotResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'TeapotsService'];

  function getPainting($stateParams, TeapotsService) {
    return TeapotsService.get({
      teapotId: $stateParams.teapotId
    }).$promise;
  }
}());
