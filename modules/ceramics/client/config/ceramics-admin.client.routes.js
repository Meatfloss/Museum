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
        controller: 'CeramicsListController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
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
      });
  }

  getCeramic.$inject = ['$stateParams', 'CeramicsService'];

  function getCeramic($stateParams, CeramicsService) {
    return CeramicsService.get({
      ceramicId: $stateParams.ceramicId
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
