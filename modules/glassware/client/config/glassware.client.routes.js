(function () {
  'use strict';

  angular
    .module('glassware.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('glassware', {
        abstract: true,
        url: '/glassware',
        template: '<ui-view/>'
      })
      .state('glassware.list', {
        url: '',
        templateUrl: 'modules/glassware/client/views/list-glassware.client.view.html',
        controller: 'GlasswareListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Glassware List'
        }
      })
      .state('glassware.view', {
        url: '/:glasswareId',
        templateUrl: 'modules/glassware/client/views/view-glassware.client.view.html',
        controller: 'GlasswareController',
        controllerAs: 'vm',
        resolve: {
          glasswareResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ glasswareResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'GlasswareService'];

  function getPainting($stateParams, GlasswareService) {
    return GlasswareService.get({
      glasswareId: $stateParams.glasswareId
    }).$promise;
  }
}());
