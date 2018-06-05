(function () {
  'use strict';

  angular
    .module('fourtreasure.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('fourtreasure', {
        abstract: true,
        url: '/fourtreasure',
        template: '<ui-view/>'
      })
      .state('fourtreasure.list', {
        url: '',
        templateUrl: 'modules/fourtreasure/client/views/list-fourtreasure.client.view.html',
        controller: 'FourtreasureListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Fourtreasure List'
        }
      })
      .state('fourtreasure.view', {
        url: '/:fourtreasureId',
        templateUrl: 'modules/fourtreasure/client/views/view-fourtreasure.client.view.html',
        controller: 'FourtreasureController',
        controllerAs: 'vm',
        resolve: {
          fourtreasureResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ fourtreasureResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'FourtreasureService'];

  function getPainting($stateParams, FourtreasureService) {
    return FourtreasureService.get({
      fourtreasureId: $stateParams.fourtreasureId
    }).$promise;
  }
}());
