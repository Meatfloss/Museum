(function () {
  'use strict';

  angular
    .module('sealxi.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('sealxi', {
        abstract: true,
        url: '/sealxi',
        template: '<ui-view/>'
      })
      .state('sealxi.list', {
        url: '',
        templateUrl: 'modules/sealxi/client/views/list-sealxi.client.view.html',
        controller: 'SealxiListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Sealxi List'
        }
      })
      .state('sealxi.view', {
        url: '/:sealxiId',
        templateUrl: 'modules/sealxi/client/views/view-sealxi.client.view.html',
        controller: 'SealxiController',
        controllerAs: 'vm',
        resolve: {
          sealxiResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ sealxiResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'SealxiService'];

  function getPainting($stateParams, SealxiService) {
    return SealxiService.get({
      sealxiId: $stateParams.sealxiId
    }).$promise;
  }
}());
