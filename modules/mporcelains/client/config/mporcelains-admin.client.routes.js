(function () {
  'use strict';

  angular
    .module('mporcelains.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.mporcelains', {
        abstract: true,
        url: '/mporcelains',
        template: '<ui-view/>'
      })
      .state('admin.mporcelains.list', {
        url: '',
        templateUrl: 'modules/mporcelains/client/views/admin/list-mporcelains.client.view.html',
        controller: 'MporcelainsAdminListController',
        controllerAs: 'vm',
        resolve: {
          mporcelainsListResolve: getMporcelainsList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.mporcelains.create', {
        url: '/create',
        templateUrl: 'modules/mporcelains/client/views/admin/form-mporcelains.client.view.html',
        controller: 'MporcelainsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          mporcelainsResolve: newMporcelains,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.mporcelains.edit', {
        url: '/:mporcelainsId/edit',
        templateUrl: 'modules/mporcelains/client/views/admin/form-mporcelains.client.view.html',
        controller: 'MporcelainsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          mporcelainsResolve: getMporcelains,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.mporcelains.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/mporcelains/client/views/admin/list-mporcelains.client.view.html',
        controller: 'MporcelainsAdminListController',
        controllerAs: 'vm',
        resolve: {
          mporcelainsListResolve: getMporcelainsList
        },
        data: {
          pageTitle: 'Ming Dynasty Porcelain'
        }
      });
  }

  getMporcelains.$inject = ['$stateParams', 'MporcelainsService'];
  function getMporcelains($stateParams, MporcelainsService) {
    return MporcelainsService.get({
      mporcelainsId: $stateParams.mporcelainsId
    }).$promise;
  }

  getMporcelainsList.$inject = ['$stateParams', 'MporcelainsListService'];
  function getMporcelainsList($stateParams, MporcelainsListService) {
    return MporcelainsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newMporcelains.$inject = ['MporcelainsService'];
  function newMporcelains(MporcelainsService) {
    return new MporcelainsService();
  }

  getDynasties.$inject = ['$stateParams', 'MporcelainsDynastyService'];
  function getDynasties($stateParams, MporcelainsService) {
    return MporcelainsService;
  }
}());
