(function () {
  'use strict';

  angular
    .module('yporcelains.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.yporcelains', {
        abstract: true,
        url: '/yporcelains',
        template: '<ui-view/>'
      })
      .state('admin.yporcelains.list', {
        url: '',
        templateUrl: 'modules/yporcelains/client/views/admin/list-yporcelains.client.view.html',
        controller: 'YporcelainsAdminListController',
        controllerAs: 'vm',
        resolve: {
          yporcelainsListResolve: getYporcelainsList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.yporcelains.create', {
        url: '/create',
        templateUrl: 'modules/yporcelains/client/views/admin/form-yporcelains.client.view.html',
        controller: 'YporcelainsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          yporcelainsResolve: newYporcelains,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.yporcelains.edit', {
        url: '/:yporcelainsId/edit',
        templateUrl: 'modules/yporcelains/client/views/admin/form-yporcelains.client.view.html',
        controller: 'YporcelainsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          yporcelainsResolve: getYporcelains,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.yporcelains.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/yporcelains/client/views/admin/list-yporcelains.client.view.html',
        controller: 'YporcelainsAdminListController',
        controllerAs: 'vm',
        resolve: {
          yporcelainsListResolve: getYporcelainsList
        },
        data: {
          pageTitle: 'Ming Dynasty Porcelains'
        }
      });
  }

  getYporcelains.$inject = ['$stateParams', 'YporcelainsService'];
  function getYporcelains($stateParams, YporcelainsService) {
    return YporcelainsService.get({
      yporcelainsId: $stateParams.yporcelainsId
    }).$promise;
  }

  getYporcelainsList.$inject = ['$stateParams', 'YporcelainsListService'];
  function getYporcelainsList($stateParams, YporcelainsListService) {
    return YporcelainsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newYporcelains.$inject = ['YporcelainsService'];
  function newYporcelains(YporcelainsService) {
    return new YporcelainsService();
  }

  getDynasties.$inject = ['$stateParams', 'YporcelainsDynastyService'];
  function getDynasties($stateParams, YporcelainsService) {
    return YporcelainsService;
  }
}());
