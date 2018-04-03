(function () {
  'use strict';

  angular
    .module('yporcelains.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('yporcelains', {
        abstract: true,
        url: '/yporcelains',
        template: '<ui-view/>'
      })
      .state('yporcelains.list', {
        url: '',
        templateUrl: 'modules/yporcelains/client/views/list-yporcelains.client.view.html',
        controller: 'YporcelainsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Yuan Dynasty Porcelains List'
        }
      })
      .state('yporcelains.view', {
        url: '/:yporcelainsId',
        templateUrl: 'modules/yporcelains/client/views/view-yporcelains.client.view.html',
        controller: 'YporcelainsController',
        controllerAs: 'vm',
        resolve: {
          yporcelainsResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ yporcelainsResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'YporcelainsService'];

  function getPainting($stateParams, YporcelainsService) {
    return YporcelainsService.get({
      yporcelainsId: $stateParams.yporcelainsId
    }).$promise;
  }
}());
