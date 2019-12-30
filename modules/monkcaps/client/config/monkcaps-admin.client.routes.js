(function () {
  'use strict';

  angular
    .module('monkcaps.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.monkcaps', {
        abstract: true,
        url: '/monkcaps',
        template: '<ui-view/>'
      })
      .state('admin.monkcaps.list', {
        url: '',
        templateUrl: 'modules/monkcaps/client/views/admin/list-monkcaps.client.view.html',
        controller: 'MonkcapsAdminListController',
        controllerAs: 'vm',
        resolve: {
          monkcapListResolve: getMonkcapList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.monkcaps.create', {
        url: '/create',
        templateUrl: 'modules/monkcaps/client/views/admin/form-monkcap.client.view.html',
        controller: 'MonkcapsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          monkcapResolve: newMonkcap,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.monkcaps.edit', {
        url: '/:monkcapId/edit',
        templateUrl: 'modules/monkcaps/client/views/admin/form-monkcap.client.view.html',
        controller: 'MonkcapsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          monkcapResolve: getMonkcap,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.monkcaps.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/monkcaps/client/views/admin/list-monkcaps.client.view.html',
        controller: 'MonkcapsAdminListController',
        controllerAs: 'vm',
        resolve: {
          monkcapListResolve: getMonkcapList
        },
        data: {
          pageTitle: 'Monkcaps List'
        }
      });
  }

  getMonkcap.$inject = ['$stateParams', 'MonkcapsService'];
  function getMonkcap($stateParams, MonkcapsService) {
    return MonkcapsService.get({
      monkcapId: $stateParams.monkcapId
    }).$promise;
  }

  getMonkcapList.$inject = ['$stateParams', 'MonkcapsListService'];
  function getMonkcapList($stateParams, MonkcapsListService) {
    return MonkcapsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newMonkcap.$inject = ['MonkcapsService'];
  function newMonkcap(MonkcapsService) {
    return new MonkcapsService();
  }

  getDynasties.$inject = ['$stateParams', 'MonkcapDynastyService'];
  function getDynasties($stateParams, MonkcapsService) {
    return MonkcapsService;
  }
}());
