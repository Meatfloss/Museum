(function () {
  'use strict';

  angular
    .module('ceramics.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ceramics', {
        abstract: true,
        url: '/ceramics',
        template: '<ui-view/>'
      })
      .state('ceramics.list', {
        url: '',
        templateUrl: 'modules/ceramics/client/views/list-ceramics.client.view.html',
        controller: 'CeramicsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ceramics List'
        }
      })
      .state('ceramics.view', {
        url: '/:ceramicId',
        templateUrl: 'modules/ceramics/client/views/view-ceramic.client.view.html',
        controller: 'CeramicsController',
        controllerAs: 'vm',
        resolve: {
          ceramicResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ ceramicResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'CeramicsService'];

  function getPainting($stateParams, CeramicsService) {
    return CeramicsService.get({
      ceramicId: $stateParams.ceramicId
    }).$promise;
  }
}());
