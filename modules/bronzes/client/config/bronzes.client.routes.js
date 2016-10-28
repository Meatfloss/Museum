(function () {
  'use strict';

  angular
    .module('bronzes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('bronzes', {
        abstract: true,
        url: '/bronzes',
        template: '<ui-view/>'
      })
      .state('bronzes.list', {
        url: '',
        templateUrl: 'modules/bronzes/client/views/list-bronzes.client.view.html',
        controller: 'BronzesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Bronzes List'
        }
      })
      .state('bronzes.view', {
        url: '/:bronzeId',
        templateUrl: 'modules/bronzes/client/views/view-bronze.client.view.html',
        controller: 'BronzesController',
        controllerAs: 'vm',
        resolve: {
          bronzeResolve: getPainting,
        },
        data: {
          pageTitle: 'Painting {{ bronzeResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BronzesService'];

  function getPainting($stateParams, BronzesService) {
    return BronzesService.get({
      bronzeId: $stateParams.bronzeId
    }).$promise;
  }
}());
