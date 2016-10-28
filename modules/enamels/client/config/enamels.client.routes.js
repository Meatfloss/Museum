(function () {
  'use strict';

  angular
    .module('enamels.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('enamels', {
        abstract: true,
        url: '/enamels',
        template: '<ui-view/>'
      })
      .state('enamels.list', {
        url: '',
        templateUrl: 'modules/enamels/client/views/list-enamels.client.view.html',
        controller: 'EnamelsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Enamels List'
        }
      })
      .state('enamels.view', {
        url: '/:enamelId',
        templateUrl: 'modules/enamels/client/views/view-enamel.client.view.html',
        controller: 'EnamelsController',
        controllerAs: 'vm',
        resolve: {
          enamelResolve: getPainting,
        },
        data: {
          pageTitle: 'Painting {{ enamelResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'EnamelsService'];

  function getPainting($stateParams, EnamelsService) {
    return EnamelsService.get({
      enamelId: $stateParams.enamelId
    }).$promise;
  }
}());
