(function () {
  'use strict';

  angular
    .module('snuff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('snuff', {
        abstract: true,
        url: '/snuff',
        template: '<ui-view/>'
      })
      .state('snuff.list', {
        url: '',
        templateUrl: 'modules/snuff/client/views/list-snuff.client.view.html',
        controller: 'SnuffListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Snuff List'
        }
      })
      .state('snuff.view', {
        url: '/:snuffId',
        templateUrl: 'modules/snuff/client/views/view-snuff.client.view.html',
        controller: 'SnuffController',
        controllerAs: 'vm',
        resolve: {
          snuffResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ snuffResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'SnuffService'];

  function getPainting($stateParams, SnuffService) {
    return SnuffService.get({
      snuffId: $stateParams.snuffId
    }).$promise;
  }
}());
