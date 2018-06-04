(function () {
  'use strict';

  angular
    .module('tianhuang.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tianhuang', {
        abstract: true,
        url: '/tianhuang',
        template: '<ui-view/>'
      })
      .state('tianhuang.list', {
        url: '',
        templateUrl: 'modules/tianhuang/client/views/list-tianhuang.client.view.html',
        controller: 'TianhuangListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tianhuang List'
        }
      })
      .state('tianhuang.view', {
        url: '/:tianhuangId',
        templateUrl: 'modules/tianhuang/client/views/view-tianhuang.client.view.html',
        controller: 'TianhuangController',
        controllerAs: 'vm',
        resolve: {
          tianhuangResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ tianhuangResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'TianhuangService'];

  function getPainting($stateParams, TianhuangService) {
    return TianhuangService.get({
      tianhuangId: $stateParams.tianhuangId
    }).$promise;
  }
}());
