(function () {
  'use strict';

  angular
    .module('sword.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('sword', {
        abstract: true,
        url: '/sword',
        template: '<ui-view/>'
      })
      .state('sword.list', {
        url: '',
        templateUrl: 'modules/sword/client/views/list-sword.client.view.html',
        controller: 'SwordListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Sword List'
        }
      })
      .state('sword.view', {
        url: '/:swordId',
        templateUrl: 'modules/sword/client/views/view-sword.client.view.html',
        controller: 'SwordController',
        controllerAs: 'vm',
        resolve: {
          swordResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ swordResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'SwordService'];

  function getPainting($stateParams, SwordService) {
    return SwordService.get({
      swordId: $stateParams.swordId
    }).$promise;
  }
}());
