(function () {
  'use strict';

  angular
    .module('qijia.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('qijia', {
        abstract: true,
        url: '/qijia',
        template: '<ui-view/>'
      })
      .state('qijia.list', {
        url: '',
        templateUrl: 'modules/qijia/client/views/list-qijia.client.view.html',
        controller: 'QijiaListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Qijia List'
        }
      })
      .state('qijia.view', {
        url: '/:qijiaId',
        templateUrl: 'modules/qijia/client/views/view-qijia.client.view.html',
        controller: 'QijiaController',
        controllerAs: 'vm',
        resolve: {
          qijiaResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ qijiaResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'QijiaService'];

  function getPainting($stateParams, QijiaService) {
    return QijiaService.get({
      qijiaId: $stateParams.qijiaId
    }).$promise;
  }
}());
