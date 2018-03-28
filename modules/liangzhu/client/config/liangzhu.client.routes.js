(function () {
  'use strict';

  angular
    .module('liangzhu.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('liangzhu', {
        abstract: true,
        url: '/liangzhu',
        template: '<ui-view/>'
      })
      .state('liangzhu.list', {
        url: '',
        templateUrl: 'modules/liangzhu/client/views/list-liangzhu.client.view.html',
        controller: 'LiangzhuListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liangzhu List'
        }
      })
      .state('liangzhu.view', {
        url: '/:liangzhuId',
        templateUrl: 'modules/liangzhu/client/views/view-liangzhu.client.view.html',
        controller: 'LiangzhuController',
        controllerAs: 'vm',
        resolve: {
          liangzhuResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ liangzhuResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'LiangzhuService'];

  function getPainting($stateParams, LiangzhuService) {
    return LiangzhuService.get({
      liangzhuId: $stateParams.liangzhuId
    }).$promise;
  }
}());
