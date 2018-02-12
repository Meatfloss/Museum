(function () {
  'use strict';

  angular
    .module('ceramics.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.ceramics', {
        abstract: true,
        url: '/ceramics',
        template: '<ui-view/>'
      })
      .state('admin.ceramics.list', {
        url: '',
        templateUrl: 'modules/ceramics/client/views/admin/list-ceramics.client.view.html',
        controller: 'CeramicsAdminListController',
        controllerAs: 'vm',
        resolve: {
          ceramicListResolve: getCeramicList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.ceramics.create', {
        url: '/create',
        templateUrl: 'modules/ceramics/client/views/admin/form-ceramic.client.view.html',
        controller: 'CeramicsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          ceramicResolve: newCeramic,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.ceramics.edit', {
        url: '/:ceramicId/edit',
        templateUrl: 'modules/ceramics/client/views/admin/form-ceramic.client.view.html',
        controller: 'CeramicsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          ceramicResolve: getCeramic,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.ceramics.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/ceramics/client/views/admin/list-ceramics.client.view.html',
        controller: 'CeramicsAdminListController',
        controllerAs: 'vm',
        resolve: {
          ceramicListResolve: getCeramicList
        },
        data: {
          pageTitle: 'Ceramics List'
        }
      });
  }

  getCeramic.$inject = ['$stateParams', 'CeramicsService'];
  function getCeramic($stateParams, CeramicsService) {
    return CeramicsService.get({
      ceramicId: $stateParams.ceramicId
    }).$promise;
  }

  getCeramicList.$inject = ['$stateParams', 'CeramicsListService'];
  function getCeramicList($stateParams, CeramicsListService) {
    return CeramicsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newCeramic.$inject = ['CeramicsService'];
  function newCeramic(CeramicsService) {
    return new CeramicsService();
  }

  getDynasties.$inject = ['$stateParams', 'DynastyService'];
  function getDynasties($stateParams, CeramicsService) {
    return CeramicsService;
  }
}());
